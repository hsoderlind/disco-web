import { Model } from "../../lib/model/Model";
import { Logotype } from "../logotype/Logotype";
import { LogotypeSchema } from "../logotype/types";
import { InvoiceSettingsSchema, InvoiceSettingsType } from "./types";

export class InvoiceSettings extends Model<InvoiceSettingsType, 'id'> {
	constructor(data: Partial<InvoiceSettingsType>, public readonly shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	logotype(): Logotype {
		if (!this.hasRelation('logotype')) {
			const model = Logotype.make(this.get<LogotypeSchema>('logotype'), this.shopId);
			return this.hasOneRelation(model, 'logotype');
		}

		return this.getHasOneRelation('logotype');
	}

	getEndpoint(action: string): string {
		if (!action) {
			console.warn('No action provided');
		}

		const endpoint = super.getEndpoint('read');

		return endpoint;
	}

	static make(data: Partial<InvoiceSettingsType>, shopId: number) {
		const instance = new InvoiceSettings(data, shopId);

		instance.logotype();

		return instance;
	}

	static async find(shopId: number) {
		const instance = new InvoiceSettings({}, shopId);
		const endpoint = instance.getEndpoint('read');
		
		const response = await instance.getHttpClient().get<InvoiceSettingsSchema>(endpoint);

		instance.fill(response.data);

		return instance;
	}

	static async setLogotype(logotype: LogotypeSchema, shopId: number) {
		const instance = new InvoiceSettings({}, shopId);
		const endpoint = instance.getEndpoint('logotype');
		
		const response = await instance.getHttpClient().put<InvoiceSettingsSchema, LogotypeSchema>(`${endpoint}/logotype`, logotype);

		instance.fill(response.data);

		return instance;
	}
}
