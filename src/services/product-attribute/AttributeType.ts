import { Model } from "../../lib/model/Model";
import { AttributeTypeType } from "./types";

export class AttributeType extends Model<AttributeTypeType, 'id'> {
	constructor(data: Partial<AttributeTypeType>, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}
}
