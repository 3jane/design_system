import esbuild from "esbuild";
import path from "path";
import { promises as fs } from "fs";
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

const entryPoint = path.resolve(inputFolder);
const outdir = path.dirname(path.resolve(outputFile));
const outfile = `${outdir}/bundle.cjs`;

try {
 await esbuild.build({
  entryPoints: [entryPoint],
  bundle: true,
  platform: "node",
  outfile,
  external: ["lodash"],
 });

 const importedModule = await import(`file://${outfile}`);
 const result = importedModule.default.default;

 await fs.writeFile(
  path.resolve(outputFile),
  JSON.stringify(result, null, 2),
  "utf-8"
 );
 await fs.unlink(outfile);

 await console.log(`Result saved to ${outputFile}`);
} catch (err) {
 console.error("Build failed:", err);
}
