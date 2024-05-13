import { getQueryData } from './../../lib/loading/getQueryData';
import { LoaderFunctionArgs } from "react-router-dom";
import { loadShopByUrlAlias } from "../shop/loaders";
import { getLoadCustomerConfig, getLoadCustomersConfig } from "./queries";

export async function loadCustomers(props: LoaderFunctionArgs) {
	const shop = await loadShopByUrlAlias(props);

	if (!shop) {
		throw 'Shop must be fetched before querying customers';
	}

	const [queryKey, queryFn] = getLoadCustomersConfig(shop.get('id'));

	return await getQueryData(queryKey, queryFn);
}

export async function loadCustomer(props: LoaderFunctionArgs) {
	const shop = await loadShopByUrlAlias(props);

	if (!shop) {
		throw 'Shop must be fetched before querying customers';
	}

	const [queryKey, queryFn] = getLoadCustomerConfig(parseInt(props.params.id!), shop.getKey());

	return await getQueryData(queryKey, queryFn);
}
