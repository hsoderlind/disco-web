import { useLoaderData as useLoaderDataReact } from "react-router-dom";

export const useLoaderData = <TData>() => {
	const data = useLoaderDataReact() as TData;

	return data;
}
