import { HttpClient } from "@hensod/HttpClient"
import app from "../application-builder/ApplicationBuilder";

export const makeHttpClientForApi = () => {
	const httpClient = new HttpClient(import.meta.env.VITE_API_BASE_URL);
	
	httpClient.setHeaders({Accept: 'application/json'});

	httpClient.createResponseInterceptor(
		(config) => config,
		(error) => {
			if (error.response?.status === 401) {
				window.location.href = '/login';
			}

			if (error.message) {
				app.addErrorNoitication(error.code!, error.message);
			}

			return Promise.reject(error);
		}
	)

	return httpClient;
}
