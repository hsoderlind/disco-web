import { useMutation } from "@tanstack/react-query";
import { ProductImage } from "../ProductImage"
import app from "../../../lib/application-builder/ApplicationBuilder";

export type OnDeletedCb = () => void;

export const useDeleteProductImage = () => {
	const mutationFn = (model: ProductImage) => model.delete();
	const mutation = useMutation(mutationFn)
	const deleteImage = (model: ProductImage, onDeleted: OnDeletedCb) => {
		mutation.mutate(model, {
			onSuccess() {
				app.addSuccessNotification({description: 'Bilden har nu raderats'});
				onDeleted();
			}
		})
	}

	return deleteImage;
}
