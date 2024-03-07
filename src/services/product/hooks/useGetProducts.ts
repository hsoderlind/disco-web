import { ProductCollection } from "../ProductCollection"

export const useGetProducts = (shopId: number) => {
	const queryKey = [ProductCollection.GET_PRODUCTS_URI] as const;
	const queryFn = () => ProductCollection.fetchAll(shopId);

	return [queryKey, queryFn] as const;
}
