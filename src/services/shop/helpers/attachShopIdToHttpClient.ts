import Cookies from 'js-cookie';
import { HttpClient } from "@hensod/HttpClient";

export const attachShopIdToHttpClient = (httpClient: HttpClient) => {
	const shopId = Cookies.get('shopId');
	httpClient.setHeaders({'x-shop-id': shopId});

	return httpClient;
}
