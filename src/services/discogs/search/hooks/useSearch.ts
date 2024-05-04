import { useMutation } from "@tanstack/react-query";
import { useShopStore } from "../../../shop/store"
import { Search } from "../Search";
import { SearchSchema } from "../types";

export const useSearch = () => {
	const shopId = useShopStore(state => state.shop.id);
	const queryFn = (criteria: SearchSchema) => Search.find(criteria!, shopId);
	const mutation = useMutation(queryFn);
	return mutation;
}
