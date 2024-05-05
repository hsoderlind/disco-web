import { Model } from "../../../lib/model/Model";
import { AddToWantListRequestSchema, AddToWantlistResultSchema } from "./types";

export class AddToWantlist extends Model<AddToWantlistResultSchema, 'id'> {
	static readonly ENDPOINT = '/api/discogs/wantlist/add';

	constructor(data: Partial<AddToWantlistResultSchema>, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static async add(input: AddToWantListRequestSchema, shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.put<AddToWantlistResultSchema, AddToWantListRequestSchema>(this.ENDPOINT, input);

		if (response.data) {
			return new AddToWantlist(response.data, shopId);
		}
	}
}
