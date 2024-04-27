import { getProductQuery } from './queries';
import { LoaderFunctionArgs } from 'react-router-dom';
import app from "../../lib/application-builder/ApplicationBuilder";
import { loadShopByUrlAlias } from '../shop/loaders';

export async function loadProduct(props: LoaderFunctionArgs) {
	const shop = await loadShopByUrlAlias(props);

	if (!shop) {
		throw 'Shop must be fetched before querying product.'
	}
	
	const [queryKey, queryFn] = getProductQuery(parseInt(props.params.id!), shop.getKey());

	return (
		app.queryClient.getQueryData(queryKey) ??
		(await app.queryClient.fetchQuery(queryKey, queryFn))
	);
}
