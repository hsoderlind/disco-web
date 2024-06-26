import { Model } from "../../lib/model/Model";
import { Role } from "../role/Role";
import { RoleCollection } from "../role/RoleCollection";
import { RoleType } from "../role/ttypes";
import type {User as UserType} from "./types";

export class User extends Model<UserType, 'id'> {
	static readonly GET_USER_URI = '/api/user';

	constructor(data?: Partial<UserType>) {
		super('id', data);
	}

	roles(): RoleCollection {
		if (!this.hasRelation('roles')) {
			const models = this.get<RoleType[]>('roles', []).map((role) => Role.make(role));
			const collection = new RoleCollection(models);
			return this.hasManyRelation(collection, 'roles');
		}

		return this.getHasManyRelation('roles');
	}

	static async masquerade(maskToId: number, shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.post<UserType>(`${this.GET_USER_URI}/${maskToId}/masquerade`);

		return User.make(response.data);
	}

	static async unmasquerade(id: number, shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.post<UserType>(`${this.GET_USER_URI}/${id}/unmasquerade`);

		return User.make(response.data);
	}

	static make(data: Partial<UserType>) {
		const instance = new User(data);

		instance.roles();

		return instance;
	}

	static async fetch() {
		const {data} = await this.httpClient.get<UserType>(this.GET_USER_URI);

		return User.make(data);
	}
}
