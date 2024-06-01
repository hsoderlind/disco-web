import { Model } from "../../lib/model/Model";
import { OrderTotalRepositorySchema } from "./types";

export class OrderTotalRepository extends Model<OrderTotalRepositorySchema, 'name'> {
	constructor(data: Partial<OrderTotalRepositorySchema>, shopId: number) {
		super('name', data);

		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static make(data: Partial<OrderTotalRepositorySchema>, shopId: number) {
		const instance = new OrderTotalRepository(data, shopId);

		return instance;
	}

	static async find(name: string, shopId: number) {
		const model = this.make({ name }, shopId);
		const endpoint = model.getEndpoint(this.ACTION_READ);

		model.getHttpClient().setHeaders({'x-shop-id': shopId});


		const response = await model.getHttpClient().get<OrderTotalRepositorySchema>(`${endpoint}/${name}`);

		return model.fill(response.data);
	}
}
