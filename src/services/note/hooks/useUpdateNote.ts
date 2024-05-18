import { useMutation } from "@tanstack/react-query";
import { ServerValidationError } from "../../../lib/error/types";
import { UseMutationOptions } from "../../../types/common";
import { useShopStore } from "../../shop/store"
import { Note } from "../Note";
import { NoteSchema } from "../types";

export const useUpdateNote = (id: number, resource: string, resourceId: number, options?: UseMutationOptions<Note, ServerValidationError, NoteSchema>) => {
	const shopId = useShopStore(state => state.shop.id);
	const mutationFn = (formValues: NoteSchema) => {
		const model = Note.make({...formValues, id}, resource, resourceId, shopId);

		return model.update();
	}

	const mutation = useMutation(mutationFn, options);

	return mutation;
}
