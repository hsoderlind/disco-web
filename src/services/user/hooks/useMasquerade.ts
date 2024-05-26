import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../../../contexts/auth/useAuthContext";
import { useShopStore } from "../../shop/store"
import { User } from "../User";

export const useMasquerade = () => {
	const {fetchUser} = useAuthContext();
	const shopId = useShopStore(state => state.shop.id);
	const mutationFn = (id: number) => User.masquerade(id, shopId);

	const mutation = useMutation(mutationFn, {
		onSuccess: () => fetchUser()
	});

	return mutation;
}
