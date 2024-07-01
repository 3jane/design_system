import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  dts: {
    resolve: true,
    compilerOptions: {
      moduleResolution: "node",
      allowImportingTsExtensions: true,
      resolveJsonModule: true,
      isolatedModules: true,
      allowSyntheticDefaultImports: true,
    },
  },
  format: ["esm", "cjs"],
  external: ["react", "@mui/material", "@emotion/react", "@emotion/styled", "@3jane/design-tokens"],
});
