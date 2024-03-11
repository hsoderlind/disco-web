import { HttpClient } from "@hensod/HttpClient"

export const makeHttpClientForApi = () => {
	const httpClient = new HttpClient(import.meta.env.VITE_API_BASE_URL);
	
	httpClient.setHeaders({Accept: 'application/json'});

	httpClient.createResponseInterceptor(
		(config) => config,
		(error) => {
			if (error.response.status === 401) {
				window.location.href = '/login';
			}

			return Promise.reject(error);
		}
	)

	return httpClient;
}
