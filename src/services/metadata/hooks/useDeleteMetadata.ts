import { useMutation } from "@tanstack/react-query";
import { ServerValidationError } from "../../../lib/error/types";
import { UseMutationOptions } from "../../../types/common";
import { useShopStore } from "../../shop/store";
import { Metadata } from "../Metadata";
import { MetadataSchema } from "../types";

export const useDeleteMetadata = (resource: string, resourceId: number, options?: UseMutationOptions<boolean, ServerValidationError, MetadataSchema['id']>) => {
	const shopId = useShopStore(state => state.shop.id);
	const mutationFn = (id: number) => {
		const model = new Metadata({id}, resource, resourceId, shopId);
		
		return model.delete();
	}

	const mutation = useMutation(mutationFn, options);

	return mutation;
}
