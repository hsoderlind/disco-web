import { Auth } from "../Auth"

export const useLogout = () => {
	const queryFn = async () => Auth.logout();

	return [queryFn] as const;
}
