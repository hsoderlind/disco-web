import { Model } from "../../lib/model/Model";
import type {User as UserType} from "./types";

export class User extends Model<UserType, 'id'> {
	static readonly GET_USER_URI = '/api/user';

	constructor(data?: Partial<UserType>) {
		super('id', data);
	}

	static async fetch() {
		const {data} = await this.httpClient.get<UserType>(this.GET_USER_URI);

		return new User(data);
	}
}
