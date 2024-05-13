import { Model } from "../../lib/model/Model";
import { CreditBalanceSchema } from "./types";

export class CreditBalance extends Model<CreditBalanceSchema, 'id'> {
	constructor(data: Partial<CreditBalanceSchema>, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}
}
