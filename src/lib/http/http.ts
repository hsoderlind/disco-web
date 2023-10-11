import { HttpClient } from "@hensod/HttpClient"

export const makeHttpClientForApi = () => {
	const httpClient = new HttpClient(import.meta.env.VITE_API_BASE_URL);
	httpClient.setHeaders({Accept: 'application/json'});

	return httpClient;
}
