import { Collection } from "../../lib/model/Collection";
import { AttributeType } from "./AttributeType";
import { AttributeValue } from "./AttributeValue";
import { AttributeTypeType, AttributeValueType } from "./types";

export class AttributeValueCollection extends Collection<AttributeValueType, 'id', AttributeValue> {
	static readonly BASE_URI = '/api/attribute-value';

	constructor(items: AttributeValue[], shopId: number) {
		super(items);
		AttributeValueCollection.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static async list(shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<AttributeValueType[]>(this.BASE_URI);

		if (response.data) {
			const items = response.data.map((data) => {
				if (data.attribute_type) {
					data.attribute_type = new AttributeType(data.attribute_type as AttributeTypeType, shopId);
				}

				return new AttributeValue(data, shopId);
			});

			return new AttributeValueCollection(items, shopId);
		}

		return new AttributeValueCollection([], shopId);
	}

	static async listByAttributeType(attributeTypeId: number, shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<AttributeValueType[]>(`${this.BASE_URI}/attribute-type/${attributeTypeId}`);

		if (response.data) {
			const items = response.data.map((data) => {
				if (data.attribute_type) {
					data.attribute_type = new AttributeType(data.attribute_type as AttributeTypeType, shopId);
				}

				return new AttributeValue(data, shopId);
			});

			return new AttributeValueCollection(items, shopId);
		}

		return new AttributeValueCollection([], shopId);
	}
}
