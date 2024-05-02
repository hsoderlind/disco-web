import { useParams } from "react-router-dom"
import { RouteParams } from "../types/common"

export const useShopPath = () => {
	const params = useParams<RouteParams>();

	if (!('urlAlias' in params)) {
		throw 'Saknar butikskontext';
	}
	
	return `/${params.urlAlias}`;
}
