import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Schema, ValidateEnv } from "@julr/vite-plugin-validate-env";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		ValidateEnv({
			VITE_APP_NAME: Schema.string(),
			VITE_APP_BASE_URL: Schema.string({format: 'url', protocol: true}),
			VITE_API_BASE_URL: Schema.string({format: 'url', protocol: true}),
			VITE_TINYMCE_API_KEY: Schema.string()
		}),
	],
	server: {
		host: 'app.disco.local',
		port: 1234,
		open: true
	}
})
