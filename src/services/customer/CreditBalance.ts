import dayjs from "dayjs";
import { Model } from "../../lib/model/Model";
import { CreditBalanceCollection } from "./CreditbalanceCollection";
import { CreditBalanceType } from "./types";

export class CreditBalance extends Model<CreditBalanceType, 'id'> {
	static readonly ENDPOINT = '/api/credit-balance';
	static readonly CUSTOMER_ENDPOINT = `${CreditBalance.ENDPOINT}/customer`;

	constructor(data: Partial<CreditBalanceType>, public readonly shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static async find(customerId: number, shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});
		const response = await this.httpClient.get<CreditBalanceType>(`${this.CUSTOMER_ENDPOINT}/${customerId}`);

		if (response.data) {
			return this.make(response.data, shopId);
		}
	}

	static make(data: Partial<CreditBalanceType>, shopId: number) {
		if (data.created_at) {
			data.created_at = dayjs(data.created_at);
		}
		
		const creditBalance = new CreditBalance(data, shopId);

		creditBalance.history();

		return creditBalance;
	}

	history(): CreditBalanceCollection {
		if (!this.hasRelation('history')) {
			const history = this.get<CreditBalanceType[]>('history')?.map((item) => CreditBalance.make(item, this.shopId));
			const collection = new CreditBalanceCollection(history, this.shopId);
			return this.hasManyRelation(collection, 'history');
		}

		return this.getHasManyRelation<CreditBalanceCollection>('history');
	}
}
