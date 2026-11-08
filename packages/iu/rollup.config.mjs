import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { transformAsync } from '@babel/core';
import solid from '@solidjs/babel-plugin';

const build = (browser) => ({
  input: 'src/index.ts',
  external: id => /^(solid-js|@solidjs\/web|shiki|@floating-ui\/dom|@iconify-icons\/material-symbols)(\/|$)/.test(id),
  output: { file: browser ? 'dist/index.browser.js' : 'dist/index.js', format: 'es', sourcemap: true, assetFileNames: '[name][extname]' },
  plugins: [
    nodeResolve(), json(), vanillaExtractPlugin({ extract: { name: 'styles.css' } }),
    typescript({ noEmit: false, declaration: !browser, declarationDir: browser ? undefined : 'dist', rootDir: 'src' }),
    {
      name: 'solid-components',
      transform(code, id) {
        if (!id.endsWith('.tsx')) return;
        return transformAsync(code, {
          filename: id, babelrc: false, configFile: false, sourceMaps: true,
          plugins: [[solid, { generate: browser ? 'dom' : 'ssr', hydratable: true }]],
        });
      },
    },
  ],
});

export default [build(true), build(false)];
