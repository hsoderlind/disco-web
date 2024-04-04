import { Collection } from "../../lib/model/Collection";
import { AttributeType } from "./AttributeType";
import { AttributeTypeType } from "./types";

export class AttributeTypeCollection extends Collection<AttributeTypeType, 'id', AttributeType> {
	static readonly GET_ATTRIBUTE_TYPES_URI = '/api/attribute-type';

	constructor(items: AttributeType[], shopId: number) {
		super(items);
		AttributeTypeCollection.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static async list(shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});
		const response = await this.httpClient.get<AttributeTypeType[]>(this.GET_ATTRIBUTE_TYPES_URI);

		if (response.data) {
			const items = response.data.map((data) => new AttributeType(data, shopId));
			return new AttributeTypeCollection(items, shopId);
		}

		return new AttributeTypeCollection([], shopId);
	}

	static async listByProduct(productId: number, shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});
		const response = await this.httpClient.get<AttributeTypeType[]>(`${this.GET_ATTRIBUTE_TYPES_URI}/product/${productId}`);

		if (response.data) {
			const items = response.data.map((data) => new AttributeType(data, shopId));
			return new AttributeTypeCollection(items, shopId);
		}

		return new AttributeTypeCollection([], shopId);
	}
}
