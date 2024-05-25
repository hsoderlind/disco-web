import { ShopUser } from "../../../../../services/shop/ShopUser";
import { ShopUserType } from "../../../../../services/shop/types"
import { EmptyFn } from "../../../../../types/common";

export type EditShopUserProps = {
	shopUser: ShopUserType;
	open: boolean;
	onCancel?: EmptyFn;
	onUpdated?: (shopUser: ShopUser) => void;
}
