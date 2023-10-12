import Shop from "../../services/shop/Shop"

export type ShopsContextType = {
	shops?: Shop[];
	selectedShop?: Shop;
	setSelectedShop: (shop: Shop) => void;
	hasShops: boolean;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
}
