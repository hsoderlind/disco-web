import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { useGetAttributeValuesByAttributeType } from "./useGetAttributeValuesByAttributeType";

export const useLoadAttributeValuesByAttributeType = (attributeTypeId: number | null) => {
	const shopId = useShopStore((state) => state.shop.id);
	const [queryKey, queryFn] = useGetAttributeValuesByAttributeType(attributeTypeId!, shopId);
	const query = useQuery(queryKey, queryFn, {
		enabled: attributeTypeId !== null
	});

	return query;
}
