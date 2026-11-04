import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
export default {
  input: 'src/index.ts',
  external: ['solid-js', '@solidjs/web'],
  output: { file: 'dist/index.js', format: 'es', sourcemap: true, assetFileNames: '[name][extname]' },
  plugins: [nodeResolve(), json(), vanillaExtractPlugin({ extract: { name: 'styles.css' } }), typescript({ noEmit: false, declaration: true, declarationDir: 'dist', rootDir: 'src' })],
};
