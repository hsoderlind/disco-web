import { UseMutationOptions } from './../../../types/common';
import { useShopStore } from "../../shop/store"
import { CreditBalance } from "../CreditBalance";
import { CreditBalanceSchema } from "../types";
import { ServerValidationError } from '../../../lib/error/types';
import { useMutation } from '@tanstack/react-query';

export const useAdjustCreditBalance = (customerId: number, options?: UseMutationOptions<CreditBalance, ServerValidationError, CreditBalanceSchema>) => {
	const shopId = useShopStore(state => state.shop.id);
	const mutationFn = (formValues: CreditBalanceSchema) => {
		const creditBalance = new CreditBalance({...formValues, customer_id: customerId}, shopId);
		return creditBalance.create();
	}

	const mutation = useMutation(mutationFn, options);

	return mutation;
}
