import { PaymentMethod } from "./PaymentMethod";
import { PaymentMethodCollection } from "./PaymentMethodCollection";

export const queryListPaymentMethods = (shopId: number, includeInactive = false) => {
	const queryKey = [PaymentMethodCollection.ENDPOINT, shopId, includeInactive];
	const queryFn = () => PaymentMethodCollection.list(includeInactive, shopId);

	return [queryKey, queryFn] as const;
}

export const queryLoadPaymentMethod = (name: string, shopId: number) => {
	const queryKey = [
		PaymentMethod.make({name}, shopId).getEndpoint(PaymentMethod.ACTION_READ),
		name,
		shopId
	];
	const queryFn = () => PaymentMethod.find(name, shopId);

	return [queryKey, queryFn] as const;
}
