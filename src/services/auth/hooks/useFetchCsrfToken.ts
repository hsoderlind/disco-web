import { Auth } from "../Auth"

export const useFetchCsrfToken = () => {
	const queryKey = [Auth.CSRF_TOKEN_URI] as const;
	const queryFn = async () => {
		return await Auth.fetchCsrfToken();
	};

	return [queryKey, queryFn] as const;
}
