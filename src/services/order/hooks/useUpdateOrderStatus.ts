import { useMutation } from "@tanstack/react-query";
import { ServerValidationError } from "../../../lib/error/types";
import { UseMutationOptions } from "../../../types/common";
import { useShopStore } from "../../shop/store";
import { OrderStatusHistoryForm } from "../OrderStatusHistoryForm";
import { CreateOrderStatusHistorySchema } from "../types";

export const useUpdateOrderStatus = (orderId: number, options?: UseMutationOptions<OrderStatusHistoryForm, ServerValidationError, Omit<CreateOrderStatusHistorySchema, 'order_id'>>) => {
	const shopId = useShopStore(state => state.shop.id);
	const model = new OrderStatusHistoryForm(orderId, {}, shopId);

	const mutationFn = (formValues: Omit<CreateOrderStatusHistorySchema, 'order_id'>) => model.fill(formValues).create();

	return useMutation(mutationFn, options);
}
