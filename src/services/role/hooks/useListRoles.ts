import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { queryListRoles } from "../queries";

export const useListRoles = () => {
	const shopId = useShopStore(state => state.shop.id);
	const [queryKey, queryFn] = queryListRoles(shopId);

	const query = useQuery(queryKey, queryFn);

	return query;
}
