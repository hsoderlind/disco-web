import { HttpClient } from "@hensod/HttpClient"
import app from "../application-builder/ApplicationBuilder";
import { ServerValidationError } from "../error/types";

export const makeHttpClientForApi = () => {
	const httpClient = new HttpClient(import.meta.env.VITE_API_BASE_URL);
	
	httpClient.setHeaders({Accept: 'application/json'});

	httpClient.createResponseInterceptor(
		(config) => config,
		(error: ServerValidationError) => {
			if (error.response?.status === 401) {
				window.location.href = '/login';
			}

			if (error.response?.data.message) {
				app.addErrorNoitication({message: error.code!, description: error.response.data.message});
			} else if (error.message) {
				app.addErrorNoitication({message: error.code!, description: error.message});
			}

			return Promise.reject(error);
		}
	)

	return httpClient;
}
