import { Model } from "../../../lib/model/Model";
import { MasterResultSchema, MasterSchema, masterResultSchema } from "./types";

export class Master extends Model<MasterResultSchema, 'id'> {
	static readonly ENDPOINT = '/api/discogs/master';

	constructor(data: MasterResultSchema, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static async find(masterId: number, shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<MasterResultSchema, MasterSchema>(this.ENDPOINT, {params: {master_id: masterId}});

		if (response.data) {
			const result = masterResultSchema.parse(response.data);
			return new Master(result, shopId);
		}
	}
}
