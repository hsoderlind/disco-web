import { Collection } from "../../lib/model/Collection";
import { Metadata } from "./Metadata";
import { MetadataSchema } from "./types";

export class MetadataCollection extends Collection<MetadataSchema, 'id', Metadata> {
	static readonly ENDPOINT = '/api/metadata';

	constructor(items: Metadata[]) {
		super(items);
	}

	static async list(resource: string, resourceId: number, shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<MetadataSchema[]>(`${this.ENDPOINT}/${resource}/${resourceId}`);

		if (response.data) {
			const models = response.data.map((item) => Metadata.make(item, resource, resourceId, shopId));
			return new MetadataCollection(models);
		}
	}
}
