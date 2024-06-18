import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { Order } from "../Order";

export const useGetOrder = (id: number) => {
	const shopId = useShopStore(state => state.shop.id);
	const model = Order.make({id}, shopId);
	const endpoint = model.getEndpoint(Order.ACTION_READ);

	const queryKey = [endpoint, id, shopId];
	const queryFn = () => model.read();

	return useQuery(queryKey, queryFn);
}
