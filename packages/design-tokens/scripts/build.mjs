import StyleDictionary from "style-dictionary";
import { registerTransforms } from "@tokens-studio/sd-transforms";
import { Command } from "commander";
import path from "path";
import setWith from "lodash.setwith";

const program = new Command();

program
  .option("--input <path>", "Input path for tokens")
  .option("--output <path>", "Output path for generated file")
  .parse(process.argv);

const options = program.opts();

const inputPath = options.input || "./src/**/*.json";
const outputPath = options.output || "./dist/tokens.json";

const outputDir = path.dirname(outputPath);
const outputFile = path.basename(outputPath);

await registerTransforms(StyleDictionary, {});

StyleDictionary.registerFormat({
  name: "minimalJSON",
  formatter: ({ dictionary }) => {
    const out = {};
    dictionary.allTokens.map((t) => setWith(out, t.path, t.value, Object));
    return JSON.stringify(out, null, 4);
  },
});

const sd = new StyleDictionary({
  source: [inputPath],
  platforms: {
    js: {
      buildPath: path.join(outputDir, "/"),
      transformGroup: "tokens-studio",
      files: [
        {
          destination: outputFile,
          format: "minimalJSON",
        },
      ],
    },
  },
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();
