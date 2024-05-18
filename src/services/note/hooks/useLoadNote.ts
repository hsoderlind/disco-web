import { useQuery } from "@tanstack/react-query";
import { queryLoadNote } from "../queries"

export const useLoadNote = (id: number, resource: string, resourceId: number) => {
	const [queryKey, queryFn] = queryLoadNote(id, resource, resourceId);

	const query = useQuery(queryKey, queryFn);

	return query;
}
