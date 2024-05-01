import { create } from "zustand";
import { TabStore } from "./types";
import { persist } from "zustand/middleware";

export const useTabStore = create<TabStore>()(persist((set) => ({
	tabs: [],
	add: (tab) => set((state) => {
		const exists = state.tabs.some((t) => t.key === tab.key);

		if (!exists) {
			return {tabs: [...state.tabs, tab]};
		}

		return state;
	}),
	remove: (tab) => set((state) => ({tabs: state.tabs.filter((t) => t.key !== tab.key)})),
	move: (fromIndex, toIndex) => set((state) => {
		const tab = state.tabs[fromIndex];
		state.tabs.splice(fromIndex, 1);
		state.tabs.splice(toIndex, 0, tab);

		return {tabs: [...state.tabs]};
	})
}),{
	name: 'tabs',
}))
