import { ShopUser } from "../../../../../services/shop/ShopUser";
import { EmptyFn } from "../../../../../types/common";

export type CreateShopUserProps = {
	open: boolean;
	onCancel?: EmptyFn;
	onCreated?: (user: ShopUser) => void;
}
