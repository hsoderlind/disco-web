import { create } from "zustand";
import { ShopStore } from "./types";

export const useShopStore = create<ShopStore>()((set) => ({
	shop: null!,
	update: (shop) => set(() => ({shop}))
}));
