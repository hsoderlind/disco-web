import { Model } from "../../lib/model/Model";
import { RoleType } from "./ttypes";

export class Role extends Model<RoleType, 'id'> {
	constructor(data: Partial<RoleType>) {
		super('id', data);
	}

	static make(data: Partial<RoleType>) {
		const instance = new Role(data);

		return instance;
	}
}
