import { useMutation } from "@tanstack/react-query";
import { ServerValidationError } from "../../../lib/error/types";
import { UseMutationOptions } from "../../../types/common";
import { useShopStore } from "../../shop/store";
import { OrderTotalRepository } from "../OrderTotalRepository";
import { BaseOrderTotalRepositorySchema } from "../types";

export const useUpdateOrderTotal = (name: string, options?: UseMutationOptions<OrderTotalRepository, ServerValidationError, BaseOrderTotalRepositorySchema>) => {
	const shopId = useShopStore(state => state.shop.id);
	const mutationFn = (formValues: BaseOrderTotalRepositorySchema) => {
		const model = OrderTotalRepository.make({...formValues, name}, shopId);
		
		return model.update();
	};

	const mutation = useMutation(mutationFn, options);

	return mutation;
}
