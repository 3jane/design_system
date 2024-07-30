import { readFile, writeFile } from "fs/promises";
import { resolve, join, dirname, relative } from "path";
import { Command } from "commander";
import StyleDictionary from "style-dictionary";
import { registerTransforms } from "@tokens-studio/sd-transforms";
import setWith from "lodash.setwith";
import camelCase from "lodash.camelcase";

const program = new Command();

program
  .option("--input <path>", "input path to $themes.json")
  .option("--output <directory>", "output directory")
  .parse(process.argv);

const options = program.opts();

if (!options.input || !options.output) {
  console.error("Both --input and --output options are required.");
  process.exit(1);
}

const inputPath = resolve(process.cwd(), options.input);
const outputDir = resolve(process.cwd(), options.output);

(async () => {
  StyleDictionary.registerTransform({
    name: "name/cti/custom",
    type: "name",
    transformer: function (token, config) {
      return camelCase(
        [config.prefix]
          .concat(token.path.map((it) => it.replace("-", "Minus")))
          .join(" ")
      );
    },
  });

  StyleDictionary.registerFormat({
    name: "minimalJSON",
    formatter: ({ dictionary }) =>
      JSON.stringify(
        dictionary.allTokens.reduce((out, t) => {
          // if (["semantics", "composites"].includes(t.path[0]) === false) {
          //   return out;
          // }

          return setWith(out, t.path, t.value, Object);
        }, {}),
        null,
        2
      ),
  });

  registerTransforms(StyleDictionary, { casing: "custom" });

  try {
    const blob = await readFile(inputPath, "utf8");
    const data = JSON.parse(blob);

    const result = data.map((item) => {
      const name = item.name;
      const group = item.group;
      const selectedTokenSets = item.selectedTokenSets || {};

      const sources = Object.keys(selectedTokenSets).map((key) =>
        relative(process.cwd(), join(dirname(inputPath), `${key}.json`))
      );

      return {
        group,
        name,
        sources,
      };
    });

    const modules = await Promise.all(
      result.map(async ({ name, group, sources }) => {
        const exportedName = camelCase(`${group} ${name}`);
        const sd = new StyleDictionary({
          source: sources,
          platforms: {
            js: {
              buildPath: join(relative(process.cwd(), outputDir), "/"),
              transformGroup: "tokens-studio",
              transform: ["name/with-minus"],
              files: [
                {
                  destination: `${group}/${name}.json`,
                  format: "minimalJSON",
                },
              ],
            },
          },
        });

        await sd.cleanAllPlatforms();
        await sd.buildAllPlatforms();

        return {
          name: exportedName,
          file: `./${group}/${name}.json`,
        };
      })
    );

    const es = modules.map(
      ({ name, file }) => `export { default as ${name} } from "${file}";`
    );
    const cjs = modules.map(
      ({ name, file }) => `exports.${name} = require("${file}");`
    );
    const types = modules.map(
      ({ name, file }) =>
        `export declare const ${name}: typeof import("${file}");`
    );

    await Promise.all([
      writeFile(join(outputDir, "index.js"), es.join("\n"), "utf8"),
      writeFile(join(outputDir, "index.cjs.js"), cjs.join("\n"), "utf8"),
      writeFile(join(outputDir, "index.d.ts"), types.join("\n"), "utf8"),
    ]);
  } catch (error) {
    console.error("Error processing the files:", error);
  }
})();
