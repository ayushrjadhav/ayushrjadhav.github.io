import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/ayushrjadhav.github.io/', // or '/' if using a custom domain
  plugins: [react()],
});
