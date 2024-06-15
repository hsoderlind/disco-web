import { Model } from "../../lib/model/Model";
import { ActionRepositorySchema } from "./types";

export class ActionRepository extends Model<ActionRepositorySchema, 'name'> {
	constructor(data: Partial<ActionRepositorySchema>, shopId: number) {
		super('name', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static make(data: Partial<ActionRepositorySchema>, shopId: number) {
		const instance = new ActionRepository(data, shopId);

		return instance;
	}
}
