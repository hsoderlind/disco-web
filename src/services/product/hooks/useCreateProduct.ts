import { ProductSchemaType, ProductType } from './../types';
import { Product } from "../Product"

export const useCreateProduct = (shopId: number) => {
	const queryFn = async (formValues: ProductSchemaType) => {
		const productData: Partial<ProductType> = {
			...formValues
		};
		const product = new Product(productData, shopId);
		return await product.create();
	}

	return [queryFn] as const;
}
