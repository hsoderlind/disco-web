import { Model } from "../../lib/model/Model";
import {Shop as ShopType} from './types'

export default class Shop extends Model<ShopType, 'id'> {
	static readonly GET_SHOP_URI = '/api/shop';

	constructor(data?: Partial<ShopType>) {
		super('id', data);
	}

	static async get(id: number) {
		const {data} = await this.httpClient.get<Pick<ShopType, 'id'>, ShopType>(this.GET_SHOP_URI, {data: {id}});

		return new Shop(data);
	}

	static async getByUrlAlias(urlAlias: string) {
		const {data} = await this.httpClient.get<ShopType>(`${this.GET_SHOP_URI}/${urlAlias}`);

		return new Shop(data);
	}

	static async fetchAllByUser() {
		const {data} = await this.httpClient.get<ShopType[]>(this.GET_SHOP_URI);
		return data.map((shopData) => new Shop(shopData));
	}
}
