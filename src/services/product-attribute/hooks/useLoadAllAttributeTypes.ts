import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { useGetAllAttributeTypes } from "./useGetAllAttributeTypes";

export const useLoadAllAttributeTypes = (key: string) => {
	const shopId = useShopStore((state) => state.shop.id);
	const [queryKey, queryFn] = useGetAllAttributeTypes(shopId);
	const query = useQuery([...queryKey, key], queryFn);

	return query;
}
