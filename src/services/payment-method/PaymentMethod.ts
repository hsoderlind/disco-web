import { Model } from "../../lib/model/Model";
import { Logotype } from "../logotype/Logotype";
import { LogotypeSchema } from "../logotype/types";
import { PaymentMethodType } from "./types";

export class PaymentMethod extends Model<PaymentMethodType, 'name'> {
	constructor(data: Partial<PaymentMethodType>, public readonly shopId: number) {
		super('name', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	logotype(): Logotype {
		if (!this.hasRelation('logotype')) {
			const model = new Logotype(this.get<LogotypeSchema>('logotype'), this.shopId);
			return this.hasOneRelation(model, 'logotype');
		}

		return this.getHasOneRelation('logotype');
	}

	getEndpoint(action: string): string {
		let endpoint = super.getEndpoint(action);

		if (action === PaymentMethod.ACTION_CREATE) {
			endpoint += `/${this.getKey()}/install`;
		} else if (action === PaymentMethod.ACTION_DELETE) {
			endpoint += '/uninstall';
		}

		return endpoint;
	}

	install() {
		return this.create();
	}

	uninstall() {
		return this.delete();
	}

	static async find(name: string, shopId: number) {
		const model = PaymentMethod.make({}, shopId);
		const endpoint = model.getEndpoint(this.ACTION_READ);
		
		model.getHttpClient().setHeaders({'x-shop-id': shopId});

		const response = await model.getHttpClient().get<PaymentMethodType>(`${endpoint}/${name}`);

		return model.fill(response.data);
	}

	static make(data: Partial<PaymentMethodType>, shopId: number) {
		const instance = new PaymentMethod(data, shopId);

		instance.logotype();

		return instance;
	}
}
