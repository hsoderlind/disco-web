import { useMutation } from "@tanstack/react-query";
import { ServerValidationError } from "../../../lib/error/types";
import { UseMutationOptions } from "../../../types/common";
import { useShopStore } from "../../shop/store";
import { ShippingMethod } from "../ShippingMethod";
import { ShippingMethodSchema } from "../types";

export const useUpdateShippingMethod = (name: string, options?: UseMutationOptions<ShippingMethod, ServerValidationError, ShippingMethodSchema>) => {
	const shopId = useShopStore(state => state.shop.id);
	const mutationFn = (formValues: ShippingMethodSchema) => ShippingMethod.make({...formValues, name}, shopId).update();

	return useMutation(mutationFn, options);
}
