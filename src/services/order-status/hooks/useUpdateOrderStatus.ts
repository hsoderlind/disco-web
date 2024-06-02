import { useMutation } from "@tanstack/react-query";
import { ServerValidationError } from "../../../lib/error/types";
import { UseMutationOptions } from "../../../types/common";
import { useShopStore } from "../../shop/store"
import { OrderStatus } from "../OrderStatus";
import { OrderStatusSchema } from "../types";

export const useUpdateOrderStatus = (options?: UseMutationOptions<OrderStatus, ServerValidationError, OrderStatusSchema>) => {
	const shopId = useShopStore(state => state.shop.id);
	const mutationFn = (formValues: OrderStatusSchema) => OrderStatus.make(formValues, shopId).update();

	return useMutation(mutationFn, options);
}
