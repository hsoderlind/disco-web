import { PaginatedCollection } from "../PaginatedCollection";
import { PaginatedResponse, Pagination } from "../types";
import { Collection } from "./Collection";
import { Model } from "./Model";
import { SearchResultSchema, SearchSchema } from "./types";

export class Search extends PaginatedCollection<Collection> {
	static readonly ENDPOINT = '/api/discogs/search';
	
	constructor(pagination: Pagination, collection: Collection, protected readonly shopId: number, protected criteria: SearchSchema) {
		super(pagination, collection);
		Search.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static async find(criteria: SearchSchema, shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});
		const response = await this.httpClient.get<PaginatedResponse<SearchResultSchema, 'results'>, SearchSchema>(Search.ENDPOINT, {params: criteria});

		if (response.data) {
			const models = response.data.results.map((data) => new Model(data));
			const collection = new Collection(models);
			return new Search(response.data.pagination, collection, shopId, criteria);
		}
	}
}
