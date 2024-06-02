import { getProductQuery } from './queries';
import { LoaderFunctionArgs } from 'react-router-dom';
import { loadShopByUrlAlias } from '../shop/loaders';
import { getQueryData } from '../../lib/loading/getQueryData';

export async function loadProduct(props: LoaderFunctionArgs) {
	const shop = await loadShopByUrlAlias(props);

	if (!shop) {
		throw 'Shop must be fetched before querying product.'
	}
	
	const [queryKey, queryFn] = getProductQuery(parseInt(props.params.id!), shop.getKey());

	return getQueryData(queryKey, queryFn);
}
