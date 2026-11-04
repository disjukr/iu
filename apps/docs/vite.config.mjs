import { defineConfig } from 'vite';
import solid from '@solidjs/vite-plugin';

export default defineConfig({
  plugins: [solid()],
  resolve: { dedupe: ['solid-js', '@solidjs/web'] },
});
