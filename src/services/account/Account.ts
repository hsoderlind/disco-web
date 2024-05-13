import { Model } from "../../lib/model/Model";
import { AccountSchema } from "./types";

export class Account extends Model<AccountSchema, 'id'> {
	constructor(data: Partial<AccountSchema>, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}
}
