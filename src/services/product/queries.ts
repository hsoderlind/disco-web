import { Product } from "./Product";

export const getProductQuery = (id: number, shopId: number) => {
	const queryKey = [Product.GET_PRODUCT_URI, id, shopId] as const;
	const queryFn = () => Product.getProduct(id, shopId);

	return [queryKey, queryFn] as const;
}