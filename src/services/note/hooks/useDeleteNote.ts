import { useMutation } from "@tanstack/react-query";
import { ServerValidationError } from "../../../lib/error/types";
import { UseMutationOptions } from "../../../types/common";
import { useShopStore } from "../../shop/store";
import { Note } from "../Note";
import { NoteSchema } from "../types";

export const useDeleteNote = (resource: string, resourceId: number, options?: UseMutationOptions<boolean, ServerValidationError, NoteSchema['id']>) => {
	const shopId = useShopStore(state => state.shop.id);
	const mutationFn = (id: number) => {
		const model = new Note({id}, resource, resourceId, shopId);

		return model.delete();
	}

	const mutation = useMutation(mutationFn, options);

	return mutation;
}
