import { CreditBalance } from "./CreditBalance";
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


export const getLoadCreditBalanceConfig = (customerId: number, shopId: number) => {
	const queryKey = [CreditBalance.CUSTOMER_ENDPOINT, shopId, customerId] as const;
	const queryFn = () => CreditBalance.find(customerId, shopId);

	return [queryKey, queryFn] as const;
}
