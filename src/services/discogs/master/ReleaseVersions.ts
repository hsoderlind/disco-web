import { PaginatedCollection } from "../PaginatedCollection";
import { PaginatedResponse, Pagination } from "../types";
import { ReleaseVersion } from "./ReleaseVersion";
import { ReleaseVersionCollection } from "./ReleaseVersionCollection";
import { MasterReleaseVersionsResultSchema, MasterReleaseVersionsSchema } from "./types";

export class ReleaseVersions extends PaginatedCollection<ReleaseVersionCollection> {
	static readonly ENDPOINT = '/api/discogs/master/release-versions';

	constructor(pagination: Pagination, collection: ReleaseVersionCollection, protected readonly shopId: number) {
		super(pagination, collection);
		ReleaseVersions.httpClient.setHeaders({'x-shop-id': this.shopId});
	}
	
	static async find(fields: Partial<MasterReleaseVersionsSchema>, shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});
		
		const response = await this.httpClient.get<PaginatedResponse<MasterReleaseVersionsResultSchema, 'versions'>>(this.ENDPOINT, {params: fields});

		if (response.data) {
			const models = response.data.versions.map((data) => new ReleaseVersion(data, shopId));
			const collection = new ReleaseVersionCollection(models, shopId);
			return new ReleaseVersions(response.data.pagination, collection, shopId);
		}
	}
}
