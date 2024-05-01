import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ValidateEnv } from "@julr/vite-plugin-validate-env";
import million from "million/compiler";
import sassDts from 'vite-plugin-sass-dts'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		million.vite({ auto: true }),
		react(),
		sassDts(),
		ValidateEnv({}),
	],
	server: {
		host: 'app.disco.local',
		port: 1234,
		open: true
	}
})
