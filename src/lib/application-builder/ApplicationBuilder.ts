import i18next, { InitOptions } from "i18next";
import { ValidationSchemaBuilder, initValidationSchemaBuilder } from "../validation/validation-schema-builder";
import zodTranslation from 'zod-i18n-map/locales/sv/zod.json';
import { NotificationInstance } from "antd/es/notification/interface";
import { ReactNode } from "react";

class ApplicationBuilder {
	private i18nConfig: InitOptions = {};
	private preferredLanguage: string = "en";
	private validationSchemaBuilder: ValidationSchemaBuilder = null!;
	private notificationApi: NotificationInstance = null!;

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

	setNotificationApi(api: NotificationInstance) {
		this.notificationApi = api;
	}

	addInfoNoitication(title: string, description: ReactNode) {
		this.notificationApi.info({
			message: title,
			description
		});
	}

	addSuccessNoitication(title: string, description: ReactNode) {
		this.notificationApi.success({
			message: title,
			description
		});
	}

	addErrorNoitication(title: string, description: ReactNode) {
		this.notificationApi.error({
			message: title,
			description
		});
	}

	addWarningNoitication(title: string, description: ReactNode) {
		this.notificationApi.warning({
			message: title,
			description
		});
	}

	private initI18n() {
		i18next.init({...this.i18nConfig, lng: this.preferredLanguage});
	}

	build() {
		this.initI18n();
		this.validationSchemaBuilder = initValidationSchemaBuilder();
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
