import { queryListShopUsers } from './../queries';
import { useShopStore } from "../store"
import { useQuery } from '@tanstack/react-query';

export const useListShopUsers = () => {
	const shopId = useShopStore(state => state.shop.id);
	const [queryKey, queryFn] = queryListShopUsers(shopId);

	const query = useQuery(queryKey, queryFn);

	return query;
}
