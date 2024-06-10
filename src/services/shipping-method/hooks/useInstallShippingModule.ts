import { useMutation } from "@tanstack/react-query";
import { ServerValidationError } from "../../../lib/error/types";
import { UseMutationOptions } from "../../../types/common";
import { useShopStore } from "../../shop/store"
import { ShippingModule } from "../ShippingModule";

export const useInstallShippingModule = (options?: UseMutationOptions<ShippingModule, ServerValidationError, string>) => {
	const shopId = useShopStore(state => state.shop.id);
	const mutationFn = (moduleName: string) => ShippingModule.make({name: moduleName}, shopId).install();

	return useMutation(mutationFn, options);
}
