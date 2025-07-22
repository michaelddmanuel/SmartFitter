import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    strictPort: true, // Force the specified port and don't try alternatives
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
