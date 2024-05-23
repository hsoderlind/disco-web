import { LoaderFunctionArgs } from "react-router-dom";
import { getShopByUrlAlias, queryListShopUsers } from "./queries";
import { getQueryData } from "../../lib/loading/getQueryData";

export async function loadShopByUrlAlias({params}: LoaderFunctionArgs) {
	const [queryKey, queryFn] = getShopByUrlAlias(params.urlAlias!);

	return await getQueryData(queryKey, queryFn);
}

export async function loadShopUsers(props: LoaderFunctionArgs) {
	const shop = await loadShopByUrlAlias(props);
	const [queryKey, queryFn] = queryListShopUsers(shop.getKey());

	return await getQueryData(queryKey, queryFn);
}
