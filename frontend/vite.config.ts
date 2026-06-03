/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// The CRA dev server ran on port 3000 and proxied `/api` to the Express server
// so the SPA and API shared an origin. `frontend-build` (root package.json)
// copies the build output into `server/public`, so the output dir stays `build`.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.DEV_SERVER_PROXY || 'http://localhost:5000',
        changeOrigin: true,
      },
    },
    // CHOKIDAR_USEPOLLING is set in the containerized dev setup so file changes
    // bind-mounted into the container are picked up by the watcher.
    watch: process.env.CHOKIDAR_USEPOLLING ? { usePolling: true } : undefined,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});
