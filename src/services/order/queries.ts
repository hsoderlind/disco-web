import { OrderTotalRepository } from "./OrderTotalRepository";

export const queryGetOrderTotalRepository = (name: string, shopId: number) => {
	const endpoint = new OrderTotalRepository({name}, shopId).getEndpoint(OrderTotalRepository.ACTION_READ)
	const queryKey = [endpoint, shopId, name];
	const queryFn = () => OrderTotalRepository.find(name, shopId);

	return [queryKey, queryFn] as const;
}
