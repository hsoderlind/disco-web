import { Model } from "../../lib/model/Model";
import { LogotypeSchema } from "../logotype/types";
import {Shop as ShopType} from './types'

export default class Shop extends Model<ShopType, 'id'> {
	static readonly GET_SHOP_URI = '/api/shop';

	constructor(data?: Partial<ShopType>) {
		super('id', data);
	}

	static async get(id: number) {
		const {data} = await this.httpClient.get<ShopType>(`${this.GET_SHOP_URI}/${id}`);

		return Shop.make(data);
	}

	static async getByUrlAlias(urlAlias: string) {
		const {data} = await this.httpClient.get<ShopType>(`${this.GET_SHOP_URI}/${urlAlias}`);

		return Shop.make(data);
	}

	static async fetchAllByUser() {
		const {data} = await this.httpClient.get<ShopType[]>(this.GET_SHOP_URI);
		return data.map((shopData) => Shop.make(shopData));
	}

	static async setLogotype(shopId: number, logotype: LogotypeSchema, context: 'default' | 'mini') {
		this.httpClient.setHeaders({'x-shop-id': shopId});
		
		const response = await this.httpClient.put<ShopType, LogotypeSchema>(`${this.GET_SHOP_URI}/${shopId}/logotype/${context}`, logotype);
		
		return Shop.make(response.data);
	}

	static make(data?: Partial<ShopType>) {
		const instance = new Shop(data);

		return instance;
	}
}
