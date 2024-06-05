import { Product } from "./Product";
import { ProductCollection } from "./ProductCollection";
import { Criteria } from "./types";

export const getProductQuery = (id: number, shopId: number) => {
	const queryKey = [Product.GET_PRODUCT_URI, id, shopId] as const;
	const queryFn = () => Product.getProduct(id, shopId);

	return [queryKey, queryFn] as const;
}

export const getListProductsSummaryQuery = (shopId: number, criteria?: Criteria) => {
	const queryKey = [ProductCollection.GET_PRODUCTS_URI, criteria, 'summary', shopId];
	const queryFn = () => ProductCollection.listAsSummary(shopId, criteria);

	return [queryKey, queryFn] as const;
}
