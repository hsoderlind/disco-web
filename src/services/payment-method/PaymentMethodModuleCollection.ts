import { Collection } from "../../lib/model/Collection";
import { PaymentMethodModule } from "./PaymentMethodModule";
import {  PaymentMethodModuleType } from "./types";

export class PaymentMethodModuleCollection extends Collection<PaymentMethodModuleType, 'name', PaymentMethodModule> {
	static readonly ENDPOINT = '/api/payment-method/modules';

	constructor(items: PaymentMethodModule[]) {
		super(items);
	}

	static createFromResponse(data: PaymentMethodModuleType[], shopId: number) {
		const models = data.map((item) => PaymentMethodModule.make(item, shopId));

		return new PaymentMethodModuleCollection(models);
	}

	static async loadModules(shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<PaymentMethodModuleType[]>(this.ENDPOINT);

		return this.createFromResponse(response.data, shopId);
	}
}
