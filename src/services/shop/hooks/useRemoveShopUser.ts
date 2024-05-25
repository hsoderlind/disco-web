import { useMutation } from "@tanstack/react-query";
import { ServerValidationError } from "../../../lib/error/types";
import { UseMutationOptions } from "../../../types/common";
import { ShopUser } from "../ShopUser";
import { useShopStore } from "../store"

export const useRemoveShopUser = (options?: UseMutationOptions<boolean, ServerValidationError, number>) => {
	const shopId = useShopStore(state => state.shop.id);
	const mutationFn = (id: number) => {
		const model = new ShopUser({id}, shopId);

		return model.delete();
	}

	const mutation = useMutation(mutationFn, options);

	return mutation;
}
