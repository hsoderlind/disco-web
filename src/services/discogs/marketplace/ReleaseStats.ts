import { Model } from "../../../lib/model/Model";
import { ReleaseStatsRequestSchema, ReleaseStatsResponseSchema } from "./types";

export class ReleaseStats extends Model<ReleaseStatsResponseSchema, 'release_id'> {
	static readonly ENDPOINT = '/api/discogs/marketplace/release-stats';

	constructor(data: ReleaseStatsResponseSchema, shopId: number) {
		super('release_id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static async find(input: ReleaseStatsRequestSchema, shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<ReleaseStatsResponseSchema, ReleaseStatsRequestSchema>(this.ENDPOINT, {params: input});

		if (response.data) {
			return new ReleaseStats(response.data, shopId);
		}
	}
}
