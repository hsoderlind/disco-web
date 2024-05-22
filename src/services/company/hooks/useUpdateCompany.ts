import { useMutation } from "@tanstack/react-query"
import { ServerValidationError } from "../../../lib/error/types"
import { UseMutationOptions } from "../../../types/common"
import { Company } from "../Company"
import { CompanySchema } from "../types"
import { useShopStore } from "../../shop/store"

export const useUpdateCompany = (id: number, options?: UseMutationOptions<Company, ServerValidationError, CompanySchema>) => {
	const shopId = useShopStore(state => state.shop.id);
	const mutationFn = (formValues: CompanySchema) => {
		const model = new Company({...formValues, id}, shopId);
		return model.update();
	}

	const mutation = useMutation(mutationFn, options);

	return mutation;
}
