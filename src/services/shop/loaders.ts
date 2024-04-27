import { LoaderFunctionArgs } from "react-router-dom";
import { getShopByUrlAlias } from "./queries";
import app from "../../lib/application-builder/ApplicationBuilder";
import Shop from "./Shop";

export async function loadShopByUrlAlias({params}: LoaderFunctionArgs) {
	const [queryKey, queryFn] = getShopByUrlAlias(params.urlAlias!);

	return (
		app.queryClient.getQueryData<Shop>(queryKey) ??
		(await app.queryClient.fetchQuery(queryKey, queryFn))
	);
}
