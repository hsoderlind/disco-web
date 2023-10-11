import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
		host: 'app.disco.local',
		port: 1234,
		open: true
	}
})
