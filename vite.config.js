import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: true,
    sourcemap: false,
  
    rollupOptions: {
      output: {
        manualChunks: (path) => {
          if (path.includes("react-responsive-carousel")) {
            return "react-responsive-carousel"
          }
          if (path.includes("@fortawesome")) {
            return "fortawesome-icons"
          }
          if (path.includes("react-toastify")) {
            return "toast"
          }
          if (path.includes("axios")) {
            return "verndor-axios"
          }
          if (path.includes("node_modules")) {
            return "vendor"
          }

          return "all"

        }
      }
    }
  }
})
