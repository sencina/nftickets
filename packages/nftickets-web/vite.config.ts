import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    server: {
      https: {
        key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
      },
      host: '0.0.0.0', // Allow external connections
      port: 5173
    }
  }
})
