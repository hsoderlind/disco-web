import { CategoryCollection } from "../CategoryCollection"

export const useGetCategories = (shopId: number) => {
	const queryKey = [CategoryCollection.GET_CATEGORIES_URI] as const;
	const queryFn = () => CategoryCollection.listAll(shopId);

	return [queryKey, queryFn] as const;
}
