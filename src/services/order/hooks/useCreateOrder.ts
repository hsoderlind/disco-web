import { useMutation } from "@tanstack/react-query";
import { ServerValidationError } from "../../../lib/error/types";
import { UseMutationOptions } from "../../../types/common";
import { useShopStore } from "../../shop/store"
import { OrderForm } from "../OrderForm";
import { CreateOrderSchema } from "../types";

export const useCreateOrder = (options?: UseMutationOptions<OrderForm, ServerValidationError, CreateOrderSchema>) => {
	const shopId = useShopStore(state => state.shop.id);
	const mutationFn = (formValues: CreateOrderSchema) => OrderForm.make(formValues, shopId).create();

	return useMutation(mutationFn, options);
}
