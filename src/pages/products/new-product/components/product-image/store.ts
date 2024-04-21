import { create } from "zustand";
import { ProductImageStore } from "./types";

export const useProductImageStore = create<ProductImageStore>()((set) => ({
	models: [],
	add: (models) => set((state) => {
		if (!Array.isArray(models)) {
			state.models.push(models);
		} else {
			models.forEach((model) => state.models.push(model));
		}

		return state;
	}),
	remove: (model) => set((state) => {
		const index = state.models.findIndex((item) => item.getKey() === model.getKey());
		state.models.splice(index, 1);

		return state
	}),
	clear: () => set({models: []})
}));