import { useMutation } from "@tanstack/react-query"
import { ServerValidationError } from "../../../lib/error/types"
import { UseMutationOptions } from "../../../types/common"
import { useShopStore } from "../../shop/store"
import { Metadata } from "../Metadata"
import { MetadataSchema } from "../types"

export const useCreateMetadata = (resource: string, resourceId: number, options?: UseMutationOptions<Metadata, ServerValidationError, MetadataSchema>) => {
	const shopId = useShopStore(state => state.shop.id);
	const mutationFn = (formValues: MetadataSchema) => {
		const model = new Metadata(formValues, resource, resourceId, shopId);

		return model.create();
	}

	const mutation = useMutation(mutationFn, options);

	return mutation;
}
