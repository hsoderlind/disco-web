import { useShopStore } from './../../shop/store';
import { ServerValidationError } from "../../../lib/error/types";
import { UseMutationOptions } from "../../../types/common";
import { PaymentMethod } from "../PaymentMethod";
import { PaymentMethodSchema } from "../types";
import { useMutation } from '@tanstack/react-query';

export const useUpdatePaymentMethod = (options?: UseMutationOptions<PaymentMethod, ServerValidationError, PaymentMethodSchema>) => {
	const shopId = useShopStore(state => state.shop.id);
	const mutationFn = (formValues: PaymentMethodSchema) => {
		const model = new PaymentMethod(formValues, shopId);

		return model.update();
	}

	const mutation = useMutation(mutationFn, options);

	return mutation;
}
