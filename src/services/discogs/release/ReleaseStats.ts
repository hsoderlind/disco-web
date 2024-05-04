import { Model } from "../../../lib/model/Model";
import { ReleaseStatsResultSchema, ReleaseStatsSchema } from "./types";

export class ReleaseStats extends Model<ReleaseStatsResultSchema, 'id'> {
	static readonly ENDPOINT = '/api/discogs/release/stats';

	constructor(data: ReleaseStatsResultSchema, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static async find(releaseId: number, shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<ReleaseStatsResultSchema, ReleaseStatsSchema>(this.ENDPOINT, {params: {release_id: releaseId}});

		if (response.data) {
			return new ReleaseStats({...response.data, id: releaseId}, shopId);
		}
	}
}
