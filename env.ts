import { defineConfig, Schema } from '@julr/vite-plugin-validate-env'

export default defineConfig({
	VITE_APP_NAME: Schema.string(),
	VITE_APP_SHORT_NAME: Schema.string(),
	VITE_APP_BASE_URL: Schema.string({format: 'url', protocol: true}),
	VITE_API_BASE_URL: Schema.string({format: 'url', protocol: true}),
	VITE_TINYMCE_API_KEY: Schema.string()
})
