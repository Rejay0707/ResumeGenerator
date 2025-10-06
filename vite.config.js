// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: "dist", // Vercel expects this
//   },
//   server: {
    
//     proxy: {
//       '/api': {
//         target: 'http://192.168.1.36:8000/',
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Fine for DirectAdmin (or Vercel)
    base: '/',       // CRITICAL FIX: Ensures asset paths start with /assets/... for root serving
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.38:8000/',  // Only for dev—update for production (see below)
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
