import { ShippingMethod } from "./ShippingMethod";
import { ShippingMethodCollection } from "./ShippingMethodCollection";

export const queryReadShippingMethod = (name: string, shopId: number) => {
	const model = new ShippingMethod({}, shopId);
	const queryKey = [model.getEndpoint(ShippingMethod.ACTION_READ), name, shopId];
	const queryFn = () => ShippingMethod.read(name, shopId);

	return [queryKey, queryFn] as const;
}

export const queryListShippingMethods = (shopId: number) => {
	const queryKey = [ShippingMethodCollection.ENDPOINT, shopId];
	const queryFn = () => ShippingMethodCollection.list(shopId);

	return [queryKey, queryFn] as const;
}
