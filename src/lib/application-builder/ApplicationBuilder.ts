import i18next, { InitOptions } from "i18next";
import { ValidationSchemaBuilder, initValidationSchemaBuilder } from "../validation/validation-schema-builder";
import zodTranslation from 'zod-i18n-map/locales/sv/zod.json';

class ApplicationBuilder {
	private i18nConfig: InitOptions = {};
	private preferredLanguage: string = "en";
	private validationSchemaBuilder: ValidationSchemaBuilder = null!;

	addI18nConfig(config: InitOptions) {
		this.i18nConfig = {...this.i18nConfig, ...config};
		return this;
	}

	setPreferredLanguage(language: string) {
		this.preferredLanguage = language;
		return this;
	}

	getValidationSchemaBuilder() {
		if (this.validationSchemaBuilder === null) {
			this.validationSchemaBuilder = initValidationSchemaBuilder();
		}
		
		return this.validationSchemaBuilder;
	}

	private initI18n() {
		i18next.init({...this.i18nConfig, lng: this.preferredLanguage});
	}

	build() {
		this.initI18n();
	}
}

const app = new ApplicationBuilder();
app.addI18nConfig({
		resources: {
			sv: {
				formValidation: zodTranslation
			}
		}
	})
	.setPreferredLanguage('sv')
	.build();

export default app;
