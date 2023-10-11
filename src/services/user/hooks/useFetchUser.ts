import { User } from "../User"

export const useFetchUser = () => {
	const queryKey = [User.GET_USER_URI] as const;
	const queryFn = async () => await User.fetch();

	return [queryKey, queryFn] as const;
}
