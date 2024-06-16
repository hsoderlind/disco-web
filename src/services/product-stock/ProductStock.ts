import dayjs from "dayjs";
import { Model } from "../../lib/model/Model";
import { ProductStockType } from "./types";
import { Product } from "../product/Product";
import { ProductType } from "../product/types";

export class ProductStock extends Model<ProductStockType, 'id'> {
	constructor(data: Partial<ProductStockType>, public readonly shopId: number) {		
		super('id', data);

		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	inStock() {
		return this.get<number>('available_quantity') > 0;
	}

	product(): Product | undefined {
		if (typeof this.get<ProductType>('product') === 'undefined') {
			return;
		}

		if (!this.hasRelation('product')) {
			return this.hasOneRelation(Product.make(this.get<ProductType>('product'), this.shopId), 'product');
		}

		return this.getHasOneRelation('product') as Product;
	}

	create(): Promise<this> {
		throw 'Not implemented';
	}

	delete(): Promise<boolean> {
		throw 'Not implemented';
	}

	static make(data: Partial<ProductStockType>, shopId: number) {
		if (data && data.available_at !== null) {
			data.available_at = dayjs(data.available_at);
		}

		const instance = new ProductStock(data, shopId);

		instance.product();

		return instance;
	}
}
