import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: { alias: { '@src': '/src', '@panda': '/styled-system' } },
  plugins: [react()],
  server: {
    host: true,
  },
})
