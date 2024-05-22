import { QueryFunction, QueryKey } from "@tanstack/react-query";
import app from "../application-builder/ApplicationBuilder";

export const getQueryData = async <TData>(queryKey: QueryKey, queryFn: QueryFunction<TData>) => {
	return (
		app.queryClient.getQueryData<TData>(queryKey) ??
		(await app.queryClient.fetchQuery<TData>(queryKey, queryFn))
	);
}
