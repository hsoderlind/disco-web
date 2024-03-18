import { Collection } from "../../lib/model/Collection";
import { Category } from "./Category";
import { CategoryType } from "./types";

export class CategoryCollection extends Collection<CategoryType, 'id', Category> {
	static readonly GET_CATEGORIES_URI = '/api/category';

	constructor(protected readonly items: Category[], protected readonly shopId: number) {
		super(items);
		CategoryCollection.httpClient.setHeaders({'x-shop-id': this.shopId});
	}

	static async listAll(shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});
		const response = await this.httpClient.get<CategoryType[]>(this.GET_CATEGORIES_URI);

		if (response.data) {
			const categories = response.data.map((categoriesData) => new Category(categoriesData, shopId));
			return new CategoryCollection(categories, shopId);
		}

		return new CategoryCollection([], shopId);
	}

	children(parentId: number) {
		const children = this.items.filter((category) => category.get<number>('parent') === parentId)
		return new CategoryCollection(children, this.shopId);
	}
}
