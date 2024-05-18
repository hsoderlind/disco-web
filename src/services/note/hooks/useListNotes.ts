import { useQuery } from "@tanstack/react-query";
import { queryListNotes } from "../queries";

export const useListNotes = (resource: string, resourceId: number) => {
	const [queryKey, queryFn] = queryListNotes(resource, resourceId)
	const query = useQuery(queryKey, queryFn);

	return query;
}
