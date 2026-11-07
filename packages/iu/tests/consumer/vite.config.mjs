import { defineConfig } from 'vite';
import solid from '@solidjs/vite-plugin';
export default defineConfig({
  plugins: [solid({ ssr: true })],
  build: { rollupOptions: { input: ['index.html', 'hydration.html'] } },
});
