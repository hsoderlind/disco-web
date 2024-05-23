import { ShopUser } from "../../../../../services/shop/ShopUser";
import { EmptyFn } from "../../../../../types/common";

export type CreateUserProps = {
	open: boolean;
	onCancel?: EmptyFn;
	onCreated?: (user: ShopUser) => void;
}
