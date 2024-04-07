import { AttributeTypeCollection } from "../AttributeTypeCollection"

export const useGetAllAttributeTypes = (shopId: number) => {
	const queryKey = [AttributeTypeCollection.BASE_URI, shopId] as const;
	const queryFn = () => AttributeTypeCollection.list(shopId);

	return [queryKey, queryFn] as const;
}
