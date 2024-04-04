import { Model } from "../../lib/model/Model";
import { AttributeValueType } from "./types";

export class AttributeValue extends Model<AttributeValueType, 'id'> {
	constructor(data: Partial<AttributeValueType>, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}
}
