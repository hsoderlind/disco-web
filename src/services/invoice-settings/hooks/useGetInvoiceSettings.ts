import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { queryFindInvoiceSettings } from "../queries";

export const useGetInvoiceSettings = () => {
	const shopId = useShopStore(state => state.shop.id);
	const [queryKey, queryFn] = queryFindInvoiceSettings(shopId);

	const query = useQuery(queryKey, queryFn);

	return query;
}
