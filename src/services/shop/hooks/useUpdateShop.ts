import { useMutation } from "@tanstack/react-query";
import { ServerValidationError } from "../../../lib/error/types";
import { UseMutationOptions } from "../../../types/common";
import Shop from "../Shop"
import { ShopSchema } from "../types"
import { ErrorBoundary } from "../../../components/error-boundary";

export {ErrorBoundary};

export const useUpdateShop = (id: number, options?: UseMutationOptions<Shop, ServerValidationError, ShopSchema>) => {
	const mutationFn = (formValues: ShopSchema) => {
		const model = new Shop({...formValues, id});
		return model.update();
	}

	const mutation = useMutation(mutationFn, options);

	return mutation;
}
