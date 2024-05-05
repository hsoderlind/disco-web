import { useQuery } from '@tanstack/react-query';
import { PriceSuggestion } from '../PriceSuggestions';
import { useShopStore } from './../../../shop/store';
export const useFindPriceSuggestions = (releaseId: number) => {
	const shopId = useShopStore(state => state.shop?.id);
	const queryKey = [PriceSuggestion.ENDPOINT, shopId, releaseId];
	const queryFn = () => PriceSuggestion.find(releaseId, shopId);

	const query = useQuery(queryKey, queryFn, {enabled: !!shopId});

	return query;
}
