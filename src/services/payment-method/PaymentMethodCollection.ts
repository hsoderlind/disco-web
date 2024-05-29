import { Collection } from "../../lib/model/Collection";
import { PaymentMethod } from "./PaymentMethod";
import {  PaymentMethodType } from "./types";

export class PaymentMethodCollection extends Collection<PaymentMethodType, 'name', PaymentMethod> {
	static readonly ENDPOINT = '/api/payment-method';

	constructor(items: PaymentMethod[]) {
		super(items);
	}

	static createFromResponse(data: PaymentMethodType[], shopId: number) {
		const models = data.map((item) => PaymentMethod.make(item, shopId));

		return new PaymentMethodCollection(models);
	}

	static async loadModules(shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<PaymentMethodType[]>(`${this.ENDPOINT}/modules`);

		return this.createFromResponse(response.data, shopId);
	}

	static async list(shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<PaymentMethodType[]>(this.ENDPOINT);

		return this.createFromResponse(response.data, shopId);
	}
}
