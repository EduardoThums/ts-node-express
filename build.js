const { build } = require("esbuild");

build({
entryPoints: ["src/index.ts"],
bundle: true,
// minify: true,
outfile: "dist/index.js",
platform: 'node', // for ESM
format: "esm",
sourcemap: true
});