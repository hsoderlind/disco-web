import { useMutation } from "@tanstack/react-query";
import { ServerValidationError } from "../../../lib/error/types";
import { UseMutationOptions } from "../../../types/common";
import { useShopStore } from "../../shop/store";
import { Role } from "../Role";
import { RoleSchema } from "../ttypes";

export const useCreateRole = (options?: UseMutationOptions<Role, ServerValidationError, RoleSchema>) => {
	const shopId = useShopStore(state => state.shop.id);
	const mutationFn = (formValues: RoleSchema) => {
		const model = new Role(formValues);
		model.getHttpClient().setHeaders({'x-shop-id': shopId});

		return model.create();
	}

	const mutation = useMutation(mutationFn, options);

	return mutation;
}
