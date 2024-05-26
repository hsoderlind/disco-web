import { LoaderFunctionArgs } from "react-router-dom";
import { loadShopByUrlAlias } from "../shop/loaders";
import { queryListRoles } from "./queries";
import { getQueryData } from "../../lib/loading/getQueryData";

export async function loadRoles(props: LoaderFunctionArgs) {
	const shop = await loadShopByUrlAlias(props);

	const [queryKey, queryFn] = queryListRoles(shop.getKey());

	return await getQueryData(queryKey, queryFn);
}
