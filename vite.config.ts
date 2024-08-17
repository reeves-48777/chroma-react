import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import wasm from 'vite-plugin-wasm';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@wasm': path.resolve(__dirname, './chroma-wasm/pkg'),
    },
  },
});
