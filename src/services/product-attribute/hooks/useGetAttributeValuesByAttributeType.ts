import { AttributeValueCollection } from "../AttributeValueCollection"

export const useGetAttributeValuesByAttributeType = (attributeTypeId: number, shopId: number) => {
	const queryKey = [AttributeValueCollection.BASE_URI, shopId, attributeTypeId] as const;
	const queryFn = () => AttributeValueCollection.listByAttributeType(attributeTypeId, shopId);

	return [queryKey, queryFn] as const;
}
