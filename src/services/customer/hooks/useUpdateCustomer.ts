import { useMutation } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { Customer } from "../Customer";
import { CustomerSchema } from "../types";
import { UseMutationOptions } from "../../../types/common";
import { ServerValidationError } from "../../../lib/error/types";

export const useUpdateCustomer = (id: number, options?: UseMutationOptions<Customer, ServerValidationError, CustomerSchema>) => {
	const shopId = useShopStore(state => state.shop.id);
	const queryFn = (formValues: CustomerSchema) => {
		const customer = new Customer({...formValues, id}, shopId);
		return customer.update();
	}

	const mutation = useMutation(queryFn, options);

	return mutation;
}
