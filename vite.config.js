import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        login: resolve(__dirname, 'src/login.html'),
      },
    },
    minify: 'terser',
    cssMinify: true,
    chunkSizeWarningLimit: 600,
  },
  plugins: [
    createHtmlPlugin({
      minify: true,
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },
  css: {
    devSourcemap: true,
  },
});
