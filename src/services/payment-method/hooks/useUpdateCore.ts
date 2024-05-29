import { useMutation } from "@tanstack/react-query";
import { ServerValidationError } from "../../../lib/error/types";
import { UseMutationOptions } from "../../../types/common";
import { useShopStore } from "../../shop/store"
import { PaymentMethod } from "../PaymentMethod";

export const useUpdateCore = (options?: UseMutationOptions<PaymentMethod, ServerValidationError, string>) => {
	const shopId = useShopStore(state => state.shop.id);
	const mutationFn = (name: string) => PaymentMethod.updateCore(name, shopId);

	const mutation = useMutation(mutationFn, options);

	return mutation;
}
