import { create } from "zustand";
import { ProductFileStore } from "./types";

export const useProductFileStore = create<ProductFileStore>()((set) => ({
	models: [],
	add: (models) => set((state) => {
		if (!Array.isArray(models)) {
			return {models: [...state.models, models]}
		} else {
			return {models: [...state.models, ...models]}
		}
	}),
	remove: (model) => set((state) => {
		return {models: state.models.filter((m) => m.getKey() !== model.getKey())}
	}),
	clear: () => set({models: []})
}));
