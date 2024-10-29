import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
 // or '/' if using a custom domain
  plugins: [react()],
  base: '/',
});
