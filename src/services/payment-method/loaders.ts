import { LoaderFunctionArgs } from "react-router-dom";
import { loadShopByUrlAlias } from "../shop/loaders";
import { queryLoadPaymentMethod } from "./queries";
import { getQueryData } from "../../lib/loading/getQueryData";

export const loadPaymentMethod = async (props: LoaderFunctionArgs) => {
	const shop = await loadShopByUrlAlias(props);

	const [queryKey, queryFn] = queryLoadPaymentMethod(props.params.name!, shop.getKey());

	return await getQueryData(queryKey, queryFn);
}
