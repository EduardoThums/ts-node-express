const { build } = require("esbuild");

build({
entryPoints: ["src/lambda.ts"],
bundle: true,
// minify: true,
outfile: "dist/lambda.js",
platform: 'node', // for ESM
format: "esm",
sourcemap: true
});