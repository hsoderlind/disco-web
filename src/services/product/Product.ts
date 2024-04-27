import { ProductSchemaType, ProductType } from './types';
import { Model } from "../../lib/model/Model";
import { ProductStock } from '../product-stock/ProductStock';
import { CategoryType } from '../category/types';
import { Category } from '../category/Category';
import { CategoryCollection } from '../category/CategoryCollection';
import { Tax } from '../tax/Tax';
import { ProductAttributeType } from '../product-attribute/types';
import { ProductAttribute } from '../product-attribute/ProductAttribute';
import { ProductAttributeCollection } from '../product-attribute/ProductAttributeCollection';
import { ProductSpecialPrice } from '../product-special-price/ProductSpecialPrice';
import { ProductSpecialPriceType } from '../product-special-price/types';
import { ProductSpecialPriceCollection } from '../product-special-price/ProductSpecialPriceCollection';

export class Product extends Model<ProductType, 'id'> {
	static readonly GET_PRODUCT_URI = '/api/product';

	constructor(data: Partial<ProductType>, protected readonly shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static async getProduct(id: number, shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});
		const response = await this.httpClient.get<ProductType>(`${this.GET_PRODUCT_URI}/${id}`);

		return response.data ? Product.make(response.data, shopId) : undefined;
	}

	static make(data: Partial<ProductType>, shopId: number) {
		const product = new Product(data, shopId);

		product.stock();
		product.tax();
		product.categories();
		product.productAttributes();
		product.specialPrices();

		return product;
	}

	stock(): ProductStock {
		if (!this.hasRelation('stock')) {
			return this.hasOneRelation(new ProductStock(this.get('stock'), this.shopId), 'stock');
		}

		return this.getHasOneRelation('stock');
	}

	tax(): Tax {
		if (!this.hasRelation('tax')) {
			return this.hasOneRelation(new Tax(this.get('tax'), this.shopId), 'tax');
		}

		return this.getHasOneRelation('tax');
	}

	categories() {
		if (!this.hasRelation('categories')) {
			const categories = this.get<CategoryType[]>('categories', []).map(category => new Category(category, this.shopId));
			const collection = new CategoryCollection(categories, this.shopId);
			return this.hasManyRelation(collection, 'categories');
		}

		return this.getHasManyRelation<CategoryCollection>('categories');
	}

	specialPrices() {
		if (!this.hasRelation('special_prices')) {
			const specialPrices = this.get<ProductSpecialPriceType[]>('special_prices', []).map((specialPrice) => ProductSpecialPrice.make(specialPrice, this.shopId));
			const collection = new ProductSpecialPriceCollection(specialPrices, this.shopId);
			return this.hasManyRelation(collection, 'special_prices');
		}

		return this.getHasManyRelation<ProductSpecialPriceCollection>('special_prices');
	}

	productAttributes() {
		if (!this.hasRelation('product_attributes')) {
			const productAttributes = this.get<ProductAttributeType[]>('product_attributes', []).map((productAttribute) => ProductAttribute.make(productAttribute, this.shopId));
			return this.hasManyRelation(new ProductAttributeCollection(productAttributes, this.shopId), 'product_attributes');
		}

		return this.getHasManyRelation<ProductAttributeCollection>('product_attributes');
	}

	fillWithFormValues(values: ProductSchemaType) {
		const attributes: Partial<ProductType> = {
			condition: values.condition,
			cost_price: values.cost_price,
			description: values.description,
			files: values.files,
			manufacturer_id: values.manufacturer_id,
			name: values.name,
			price: values.price,
			reference: values.reference,
			state: values.state,
			stock: values.stock,
			supplier_reference: values.supplier_reference,
			barcodes: values.barcodes,
			categories: values.categories,
			tax_id: values.tax_id,
			images: values.images,
			product_attributes: values.product_attributes,
			special_prices: values.special_prices,
			summary: values.summary,
			supplier_id: values.supplier_id
		}

		return this.fill(attributes);
	}

	toFormValues() {
		const values: ProductSchemaType = {
			categories: this.categories().collect('id'),
			condition: this.get('condition'),
			cost_price: this.get('cost_price'),
			name: this.get('name'),
			price: this.get('price'),
			product_attributes: this.productAttributes().toJSON(),
			state: this.get('state'),
			stock: this.get('stock'),
			tax_id: this.tax().get('id'),
			barcodes: this.get('barcodes'),
			description: this.get('description'),
			files: this.get('files'),
			images: this.get('images'),
			manufacturer_id: this.get('manufacturer_id'),
			price_incl_vat: this.get('price_incl_vat'),
			reference: this.get('reference'),
			special_prices: this.specialPrices().toJSON(),
			summary: this.get('summary'),
			supplier_id: this.get('supplier_id'),
			supplier_reference: this.get('supplier_reference')
		}

		return values;
	}
}
