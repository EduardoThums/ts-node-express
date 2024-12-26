import { build } from 'esbuild';

build({
  entryPoints: ['src/lambda.ts'],
  bundle: true,
  minify: true,
  outfile: 'dist/main.js',
  platform: 'node', // for ESM
  // format: "esm",
  sourcemap: true,
  treeShaking: true, // Enable tree-shaking to remove unused code,
  tsconfig: 'tsconfig.json', // Use your TypeScript configuration file
  loader: {
    '.ts': 'ts', // Use the TypeScript loader for `.ts` files
  },
  external: ['@aws-sdk/client-ssm'],
});
