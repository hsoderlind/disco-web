import { RoleCollection } from "./RoleCollection"

export const queryListRoles = (shopId: number) => {
	const queryKey = [RoleCollection.ENDPOINT, shopId];
	const queryFn = () => RoleCollection.list(shopId);

	return [queryKey, queryFn] as const;
}
