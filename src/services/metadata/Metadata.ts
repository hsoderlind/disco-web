import { Model } from "../../lib/model/Model";
import { MetadataSchema } from "./types";

export class Metadata extends Model<MetadataSchema, 'id'> {
	constructor(data: Partial<MetadataSchema>, protected readonly resource: string, protected readonly resourceId: number, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static make(data: Partial<MetadataSchema>, resource: string, resourceId: number, shopId: number) {
		const instance = new Metadata(data, resource, resourceId, shopId);

		return instance;
	}

	getEndpoint(action: string): string {
		const endpoint = super.getEndpoint(action);

		if (action === 'create') {
			return `${endpoint}/${this.resource}/${this.resourceId}`;
		}

		return endpoint;
	}
}
