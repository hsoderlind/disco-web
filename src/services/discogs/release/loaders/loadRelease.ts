import { LoaderFunctionArgs } from "react-router-dom";
import { loadShopByUrlAlias } from "../../../shop/loaders";
import { getFindReleaseQueryConfig } from "../queries/getFindReleaseQueryConfig";
import app from "../../../../lib/application-builder/ApplicationBuilder";
import { Release } from "../Release";

export async function loadRelease(props: LoaderFunctionArgs) {
	const shop = await loadShopByUrlAlias(props);

	if (!shop) {
		throw 'Shop must be fetched before querying product.'
	}

	const [queryKey, queryFn] = getFindReleaseQueryConfig(parseInt(props.params.id!), shop.getKey());

	return (
		app.queryClient.getQueryData<Release>(queryKey) ??
		(await app.queryClient.fetchQuery(queryKey, queryFn))
	);
}
