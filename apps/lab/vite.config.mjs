import { defineConfig } from 'vite';
import solid from '@solidjs/vite-plugin';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { fileURLToPath } from 'node:url';
import { iuReload } from '../../scripts/iu-reload.mjs';

export default defineConfig(({ command }) => ({
  plugins: [solid(), command === 'serve' && vanillaExtractPlugin(), iuReload()],
  resolve: {
    alias: command === 'serve' ? [
      { find: /^iu$/, replacement: fileURLToPath(new URL('../../packages/iu/src/index.ts', import.meta.url)) },
      { find: /^iu\/styles\.css$/, replacement: fileURLToPath(new URL('../../packages/iu/src/root.css.ts', import.meta.url)) },
    ] : [],
    dedupe: ['solid-js', '@solidjs/web'],
  },
  optimizeDeps: { exclude: ['iu'] },
  server: { port: 5174, strictPort: true },
  preview: { port: 4174, strictPort: true },
}));
