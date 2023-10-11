import { Auth } from "../Auth"

export const useFetchCsrfToken = () => {
	const queryKey = [Auth.CSRF_TOKEN_URI] as const;
	const queryFn = async () => {
		await Auth.fetchCsrfToken();
		return null;
	};

	return [queryKey, queryFn] as const;
}
