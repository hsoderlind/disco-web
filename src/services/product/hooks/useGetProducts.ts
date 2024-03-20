import { ProductCollection } from "../ProductCollection"

export const useGetProducts = (shopId: number, category = 0) => {
	const queryKey = [ProductCollection.GET_PRODUCTS_URI, category] as const;
	const queryFn = () => ProductCollection.fetchAll(shopId, category);

	return [queryKey, queryFn] as const;
}
