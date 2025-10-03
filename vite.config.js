import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Vercel expects this
  },
  server: {
    
    proxy: {
      '/api': {
        target: 'http://192.168.1.33:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
