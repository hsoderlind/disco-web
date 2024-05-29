import { useMutation } from "@tanstack/react-query";
import { ServerValidationError } from "../../../lib/error/types";
import { UseMutationOptions } from "../../../types/common";
import { PaymentMethod } from "../PaymentMethod";

export const useUninstallPaymentMethod = (options?: UseMutationOptions<boolean, ServerValidationError, PaymentMethod>) => {
	const mutationFn = (model: PaymentMethod) => model.uninstall();

	const mutation = useMutation(mutationFn, options);

	return mutation;
}
