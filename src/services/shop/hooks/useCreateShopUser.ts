import { useMutation } from "@tanstack/react-query";
import { ServerValidationError } from "../../../lib/error/types";
import { UseMutationOptions } from "../../../types/common";
import { ShopUser } from "../ShopUser";
import { useShopStore } from "../store";
import { ShopUserSchema, ShopUserType } from "../types";

export const useCreateShopUser = (options?: UseMutationOptions<ShopUser, ServerValidationError, ShopUserSchema>) => {
	const shopId = useShopStore(state => state.shop.id);
	
	const mutationFn = (formValues: ShopUserSchema) => {
		const model = new ShopUser(formValues as ShopUserType, shopId);
		
		return model.create();
	}

	const mutation = useMutation(mutationFn, options);

	return mutation;
}
