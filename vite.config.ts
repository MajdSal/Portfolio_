import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    // Honour a harness-assigned port when present, else default to 5173.
    port: Number(process.env.PORT) || 5173,
  },
});
