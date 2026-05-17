import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Recomendation-system-for-products-React/",
  build: {
    outDir: "docs"
  }
})
