import i18next, { InitOptions } from "i18next";
import { ValidationSchemaBuilder, initValidationSchemaBuilder } from "../validation/validation-schema-builder";
import zodTranslation from 'zod-i18n-map/locales/sv/zod.json';
import { ArgsProps, NotificationInstance } from "antd/es/notification/interface";
import 'dayjs/locale/sv';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { MessageInstance } from "antd/es/message/interface";
import { ReactNode } from "react";

class ApplicationBuilder {
	private i18nConfig: InitOptions = {};
	private preferredLanguage: string = "sv";
	private validationSchemaBuilder: ValidationSchemaBuilder = null!;
	private notificationApi: NotificationInstance = null!;
	private messageApi: MessageInstance = null!;
	private _locale = 'sv-SE';

	get locale() {
		return this._locale;
	}

	set locale(value: string) {
		if (!this.validateLocale(value)) {
			throw `${value} is not a valid locale`;
		}

		this._locale = value;
	}

	validateLocale(value: string) {
		return /[a-z]{2}[-]{1}[A-Z]{2}/gi.test(value);
	}

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

	addInfoNotification({description, message = 'Info'}: Pick<ArgsProps,  'description'> & {message?: ArgsProps['message']}) {
		this.notificationApi.info({
			message,
			description
		});
	}

	addSuccessNotification({description, message = 'Lyckades!'}: Pick<ArgsProps,  'description'> & {message?: ArgsProps['message']}) {
		this.notificationApi.success({
			message,
			description
		});
	}

	addErrorNotification({description, message = 'Fel!'}: Pick<ArgsProps,  'description'> & {message?: ArgsProps['message']}) {
		this.notificationApi.error({
			message,
			description
		});
	}

	addWarningNotification({description, message = 'Varning!'}: Pick<ArgsProps,  'description'> & {message?: ArgsProps['message']}) {
		this.notificationApi.warning({
			message,
			description
		});
	}

	setMessageApi(api: MessageInstance) {
		this.messageApi = api;
	}

	hideMessage() {
		this.messageApi.destroy();
	}

	showInfoMessage(content: ReactNode) {
		this.messageApi.info(content);
	}

	showSuccessMessage(content: ReactNode) {
		this.messageApi.success(content);
	}

	showWarningMessage(content: ReactNode) {
		this.messageApi.warning(content);
	}

	showErrorMessage(content: ReactNode) {
		this.messageApi.error(content);
	}

	private initI18n() {
		i18next.init({...this.i18nConfig, lng: this.preferredLanguage});
	}

	private initDayJs() {
		dayjs.extend(utc);
		dayjs.extend(timezone);
		dayjs.tz.setDefault('Europe/Stockholm');
		dayjs.locale('sv');
	}

	build() {
		this.initI18n();
		this.initDayJs();
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
