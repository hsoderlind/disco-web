import { useQuery } from "@tanstack/react-query";
import { useGetTaxById } from "./useGetTaxById";

export const useLoadTaxById = (id?: number) => {
	const [queryKey, queryFn] = useGetTaxById(id!);
	const query = useQuery(queryKey, queryFn, {enabled: !!id});

	return query;
}
