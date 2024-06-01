import { useMutation } from "@tanstack/react-query";
import { ServerValidationError } from "../../../lib/error/types";
import { UseMutationOptions } from "../../../types/common";
import { useShopStore } from "../../shop/store";
import { OrderTotalModule } from "../OrderTotalModule";

export const useUpdateOrderTotalModule = (options?: UseMutationOptions<OrderTotalModule, ServerValidationError, string>) => {
	const shopId = useShopStore(state => state.shop.id);
	const mutationFn = (name: string) => {
		return OrderTotalModule.make({ name }, shopId).update();
	}

	const mutation = useMutation(mutationFn, options);

	return mutation;
}
