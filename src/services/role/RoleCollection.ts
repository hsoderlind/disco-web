import { Collection } from "../../lib/model/Collection";
import { Role } from "./Role";
import { RoleType } from "./ttypes";

export class RoleCollection extends Collection<RoleType, 'id'> {
	static readonly ENDPOINT = '/api/role';

	constructor(items: Role[]) {
		super(items);
	}

	static async list(shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<RoleType[]>(this.ENDPOINT);

		const models = Object.values(response.data).map((data) => Role.make(data));
		
		return new RoleCollection(models);
	}
}
