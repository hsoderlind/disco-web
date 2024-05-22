import { LoaderFunctionArgs } from "react-router-dom";
import { queryCompanyForShop, queryFindCompany } from "./queries";
import { getQueryData } from "../../lib/loading/getQueryData";
import { loadShopByUrlAlias } from "../shop/loaders";

export async function loadCompany(props: LoaderFunctionArgs) {
	const shop = await loadShopByUrlAlias(props);

	if (typeof shop === 'undefined') {
		throw 'Shop must be loaded before loading company';
	}
	
	const [queryKey, queryFn] = queryFindCompany(parseInt(props.params.id!), shop.getKey());

	return await getQueryData(queryKey, queryFn);
}

export async function loadCompanyForShop(props: LoaderFunctionArgs) {
	const shop = await loadShopByUrlAlias(props);

	if (typeof shop === 'undefined') {
		throw 'Shop must be loaded before loading company';
	}

	const [queryKey, queryFn] = queryCompanyForShop(shop.getKey());

	return await getQueryData(queryKey, queryFn);
}
