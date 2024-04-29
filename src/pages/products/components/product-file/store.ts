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
	move: (fromIndex, toIndex) => set((state) => {
		const model = state.models[fromIndex];
		state.models.splice(fromIndex, 1);
		state.models.splice(toIndex, 0, model);

		state.models.map((model, index) => model.set('sort_order', index + 1));

		return {models: [...state.models]};
	}),
	clear: () => set({models: []})
}));
