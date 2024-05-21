import { useMutation } from "@tanstack/react-query"
import { ServerValidationError } from "../../../lib/error/types"
import { UseMutationOptions } from "../../../types/common"
import { LogotypeSchema } from "../../logotype/types"
import { useShopStore } from "../../shop/store"
import { InvoiceSettings } from "../InvoiceSettings"

export const useSetLogotype = (options?: UseMutationOptions<InvoiceSettings, ServerValidationError, LogotypeSchema>) => {
	const shopId = useShopStore(state => state.shop.id);
	const mutationFn = (logotype: LogotypeSchema) => InvoiceSettings.setLogotype(logotype, shopId);

	const mutation = useMutation(mutationFn, options);

	return mutation;
}
