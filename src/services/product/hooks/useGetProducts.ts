import { ProductCollection } from "../ProductCollection"

export const useGetProducts = () => {
	const queryKey = [ProductCollection.GET_PRODUCTS_URI] as const;
	const queryFn = () => ProductCollection.fetchAll();

	return [queryKey, queryFn] as const;
}
