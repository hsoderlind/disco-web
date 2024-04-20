import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { useGetAllBarcodeTypes } from "./useGetAllBarcodeTypes";

export const useLoadBarcodeTypes = () => {
	const shopId = useShopStore((state) => state.shop.id);
	const [queryKey, queryFn] = useGetAllBarcodeTypes(shopId);
	const query = useQuery(queryKey, queryFn, {enabled: !!shopId});

	return query;
}
