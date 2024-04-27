import { useQuery } from "@tanstack/react-query";
import { useGetProduct } from "./useGetProduct"

export const useLoadProduct = (id: number) => {
	const [queryKey, queryFn] = useGetProduct(id);
	const query = useQuery(queryKey, queryFn);

	return query;
}
