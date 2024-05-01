import { makeHttpClientForApi } from "../../../lib/http/http";
import { HasToken } from "./types";

export class Auth {
	static readonly CHECK_URL = '/api/discogs/authed/';

	public static async checkToken(shopId: number) {
		const httpClient = makeHttpClientForApi();

		httpClient.setHeaders({'x-shop-id': shopId});
		const response = await httpClient.get<HasToken>(`${Auth.CHECK_URL}${shopId}`);

		return response.data;
	}
}
