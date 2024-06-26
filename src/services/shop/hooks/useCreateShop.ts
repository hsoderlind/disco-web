import Shop from "../Shop"
import { ShopSchema } from "../types"

export const useCreateShop = () => {
	const queryFn = async (data: ShopSchema) => {
		const shop = Shop.make(data);
		return await shop.create();
	}

	return [queryFn] as const;
}
