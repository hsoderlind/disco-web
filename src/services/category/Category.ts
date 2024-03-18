import { Model } from "../../lib/model/Model";
import { CategoryType } from "./types";

export class Category extends Model<CategoryType, 'id'> {
	static readonly GET_CATEGORY_URI = '/api/category';

	constructor(data: Partial<CategoryType>, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}
}
