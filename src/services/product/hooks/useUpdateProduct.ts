import { Product } from '../Product';
import { ProductSchemaType } from './../types';
export const useUpdateProduct = (product: Product) => {
	const queryFn = (values: ProductSchemaType) => product.fillWithFormValues(values).update();

	return queryFn;
}
