import { ProductSchemaType, ProductType } from './../types';
import { Product } from "../Product"

export const useCreateProduct = (shopId: number) => {
	const queryFn = async (data: ProductSchemaType) => {
		const productData: Partial<ProductType> = {
			...data,
			available_at: data.available_at?.toISOString()
		};
		const product = new Product(productData, shopId);
		return await product.create();
	}

	return [queryFn] as const;
}
