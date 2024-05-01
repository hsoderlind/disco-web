import { create } from "zustand";
import { ProductImageStore } from "./types";

export const useProductImageStore = create<ProductImageStore>()((set) => ({
	models: [],
	add: (models) => set((state) => {
		if (!Array.isArray(models)) {
			const exists = state.models.some((model) => model.getKey() === models.getKey());

			if (!exists) {
				return {models: [...state.models, models]};
			} else {
				return state
			}
		} else {
			const modelsThatDontExists = models.filter((model) => !state.models.some((m) => m.getKey() !== model.getKey()));
			return {models: [...state.models, ...modelsThatDontExists]};
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
