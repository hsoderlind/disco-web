import { OrderStatus } from "./OrderStatus";
import { OrderStatusCollection } from "./OrderStatusCollection";

export const queryListOrderStatuses = (shopId: number) => {
	const queryKey = [OrderStatusCollection.ENDPOINT, shopId];
	const queryFn = () => OrderStatusCollection.list(shopId);

	return [queryKey, queryFn] as const;
}

export const queryLoadOrderStatus = (id: number, shopId: number) => {
	const model = new OrderStatus({id}, shopId);
	const endpoint = model.getEndpoint(OrderStatus.ACTION_READ);
	const queryKey = [endpoint, id, shopId];
	const queryFn = () => model.read();

	return [queryKey, queryFn] as const;
}
