import { Model } from "../../../lib/model/Model";
import { PriceSuggestionsRequestSchema, PriceSuggestionsResponseSchema } from "./types";

export class PriceSuggestion extends Model<PriceSuggestionsResponseSchema, 'release_id'> {
	static readonly ENDPOINT = '/api/discogs/marketplace/price-suggestions';

	constructor(data: PriceSuggestionsResponseSchema, shopId: number) {
		super('release_id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static async find(releaseId: number, shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<PriceSuggestionsResponseSchema, PriceSuggestionsRequestSchema>(this.ENDPOINT, {params: {release_id: releaseId}});

		if (response.data) {
			return new PriceSuggestion(response.data, shopId);
		}
	}
}
