import { Model } from "../../lib/model/Model";
import { Logotype } from "../logotype/Logotype";
import { LogotypeSchema } from "../logotype/types";
import { PaymentMethodModuleType } from "./types";

export class PaymentMethodModule extends Model<PaymentMethodModuleType, 'name'> {
	constructor(data: Partial<PaymentMethodModuleType>, public readonly shopId: number) {
		super('name', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	logotype(): Logotype {
		if (!this.hasRelation('logotype')) {
			const data = this.get('logotype') as Partial<LogotypeSchema> | undefined;
			const model = typeof data !== 'undefined' ? new Logotype(data, this.shopId) : new Logotype({}, this.shopId);
			return this.hasOneRelation(model, 'logotype');
		}

		return this.getHasOneRelation('logotype');
	}

	static make(data: Partial<PaymentMethodModuleType>, shopId: number) {
		const instance = new PaymentMethodModule(data, shopId);

		instance.logotype();

		return instance;
	}
}
