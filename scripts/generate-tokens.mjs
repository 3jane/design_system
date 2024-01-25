import _ from "lodash";
import StyleDictionary from "style-dictionary";
import { registerTransforms } from "@tokens-studio/sd-transforms";
import path from "path";
import minimist from "minimist";

const args = minimist(process.argv.slice(2), {
 alias: {
  input: "i",
  output: "o",
 },
});

const inputFolder = args.input;
const outputFile = args.output;

if (!inputFolder || !outputFile) {
 console.log("Please provide both input and output parameters");
 process.exit(1);
}

registerTransforms(StyleDictionary, {
 expand: {
  composition: false,
  // typography: true,
  shadow: false,
 },
});

// Register custom format to minimize output
StyleDictionary.registerFormat({
 name: "minimalJSON",
 formatter: ({ dictionary }) => {
  const out = {};
  dictionary.allTokens.map((t) => _.setWith(out, t.path, t.value, Object));
  return JSON.stringify(out, null, 4);
 },
});

const buildDir = path.dirname(outputFile);
const buildName = path.basename(outputFile);
const sd = new StyleDictionary({
 source: [path.join(inputFolder, "./**/*.json")],
 platforms: {
  js: {
   buildPath: buildDir.endsWith("/") ? buildDir : `${buildDir}/`,
   transformGroup: "tokens-studio",
   files: [
    {
     destination: buildName,
     format: "minimalJSON",
    },
   ],
  },
 },
});

async function buildTokens() {
 await sd.cleanAllPlatforms();
 await sd.buildAllPlatforms();
}

buildTokens()
 .then(() => {
  console.log(`Tokens have been successfully written to file: ${outputFile}`);
 })
 .catch((err) => {
  console.error("An error occurred while building tokens:", err);
 });
