import { create } from "zustand";
import { UserPermissionsStore } from "./types";

export const useUserPermissionsStore = create<UserPermissionsStore>()((set) => ({
	permissions: null!,
	update: (permissions) => set(() => ({permissions}))
}));
