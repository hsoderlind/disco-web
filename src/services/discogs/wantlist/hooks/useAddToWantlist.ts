import { useMutation } from "@tanstack/react-query";
import { useShopStore } from "../../../shop/store"
import { AddToWantlist } from "../AddToWantlist";
import { AddToWantListRequestSchema } from "../types";
import app from "../../../../lib/application-builder/ApplicationBuilder";

export const useAddToWantlist = () => {
	const shopId = useShopStore(state => state.shop?.id);
	const queryFn = (input: AddToWantListRequestSchema) => AddToWantlist.add(input, shopId);
	const mutation = useMutation(queryFn, {
		onSuccess: () => app.addSuccessNotification({description: 'Artikeln är nu tillagd i din önskelista'})
	});

	return mutation;
}
