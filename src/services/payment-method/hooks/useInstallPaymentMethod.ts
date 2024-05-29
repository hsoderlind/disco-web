import { useMutation } from "@tanstack/react-query";
import { ServerValidationError } from "../../../lib/error/types";
import { UseMutationOptions } from "../../../types/common";
import { useShopStore } from "../../shop/store";
import { PaymentMethod } from "../PaymentMethod";
import { PaymentMethodModuleSchema } from "../types";

export const useInstallPaymentMethod = (options?: UseMutationOptions<PaymentMethod, ServerValidationError, PaymentMethodModuleSchema>) => {
	const shopId = useShopStore(state => state.shop.id);
	const mutationFn = (paymentMethod: PaymentMethodModuleSchema) => {
		const model = PaymentMethod.make(paymentMethod, shopId);

		return model.install();
	}

	const mutation = useMutation(mutationFn, options);

	return mutation;
}
