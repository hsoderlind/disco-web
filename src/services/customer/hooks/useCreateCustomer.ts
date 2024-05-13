import { useMutation } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { Customer } from "../Customer";
import { CustomerSchema } from "../types";
import { ServerValidationError } from "../../../lib/error/types";
import { UseMutationOptions } from "../../../types/common";

export const useCreateCustomer = (options?: UseMutationOptions<Customer, ServerValidationError, CustomerSchema>) => {
	const shopId = useShopStore((state) => state.shop.id);
	const mutationFn = (formValues: CustomerSchema) => {
		const customer = Customer.make(formValues, shopId);
		return customer.create();
	}

	const mutation = useMutation(mutationFn, options);

	return mutation;
}
