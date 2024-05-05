import { Model } from "../../../lib/model/Model";
import { ReleaseRequestSchema, ReleaseResponseSchema } from "./types";

export class Release extends Model<ReleaseResponseSchema, 'id'> {
	static readonly ENDPOINT = '/api/discogs/release';

	constructor(data: Partial<ReleaseResponseSchema>, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static async find(input: ReleaseRequestSchema, shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<ReleaseResponseSchema, ReleaseRequestSchema>(this.ENDPOINT, {params: input});

		if (response.data) {
			return new Release(response.data, shopId);
		}
	}
}
