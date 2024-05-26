import { useMutation } from "@tanstack/react-query";
import { ServerValidationError } from "../../../lib/error/types";
import { UseMutationOptions } from "../../../types/common";
import { useShopStore } from "../../shop/store";
import { Role } from "../Role";

export const useDeleteRole = (options?: UseMutationOptions<boolean, ServerValidationError, number>) => {
	const shopId = useShopStore(state => state.shop.id);
	const mutationFn = (id: number) => {
		const model = new Role({id});
		model.getHttpClient().setHeaders({'x-shop-id': shopId});

		return model.delete();
	}

	const mutation = useMutation(mutationFn, options);

	return mutation;
}
