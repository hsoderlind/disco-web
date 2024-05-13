import { Customer } from "./Customer";
import { CustomerCollection } from "./CustomerCollection"

export const getLoadCustomersConfig = (shopId: number) => {
	const queryKey = [CustomerCollection.ENDPOINT, shopId] as const;
	const queryFn = () => CustomerCollection.list(shopId);

	return [queryKey, queryFn] as const;
}

export const getLoadCustomerConfig = (id: number, shopId: number) => {
	const queryKey = [Customer.ENDPOINT, shopId, id] as const;
	const queryFn = () => Customer.find(id, shopId);

	return [queryKey, queryFn] as const;
}
