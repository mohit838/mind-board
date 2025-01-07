import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9191,
    host: true,
  },
  preview: {
    port: 9191,
    host: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
