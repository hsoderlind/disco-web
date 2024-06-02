import { ProductSchemaType } from './../types';
import { Product } from "../Product"

export const useCreateProduct = (shopId: number) => {
	const queryFn = async (formValues: ProductSchemaType) => {
		const product = new Product({}, shopId);
		product.fillWithFormValues(formValues);
		return await product.create();
	}

	return [queryFn] as const;
}
