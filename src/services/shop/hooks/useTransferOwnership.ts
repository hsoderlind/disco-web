import { useMutation } from "@tanstack/react-query";
import { ServerValidationError } from "../../../lib/error/types";
import { UseMutationOptions } from "../../../types/common";
import { ShopUser } from "../ShopUser";
import { useShopStore } from "../store";

export const useTransferOwnership = (options?: UseMutationOptions<ShopUser, ServerValidationError, number>) => {
	const shopId = useShopStore(state => state.shop.id);
	const mutationFn = (newOwnerId: number) => ShopUser.transferOwnership(newOwnerId, shopId);

	const mutation = useMutation(mutationFn, options);

	return mutation;
}
