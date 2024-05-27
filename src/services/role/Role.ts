import { Model } from "../../lib/model/Model";
import { Permission } from "../permissions/Permission";
import { PermissionCollection } from "../permissions/PermissionCollection";
import { PermissionSchema } from "../permissions/types";
import { RoleType } from "./ttypes";

export class Role extends Model<RoleType, 'id'> {
	constructor(data: Partial<RoleType>) {
		super('id', data);
	}

	permissions(): PermissionCollection {
		if (!this.hasRelation('permissions')) {
			const models = this.get<PermissionSchema[]>('permissions', []).map((data) => Permission.make(data));
			const collection = new PermissionCollection(models);
			return this.hasManyRelation(collection, 'permissions');
		}

		return this.getHasManyRelation('permissions');
	}

	static make(data: Partial<RoleType>) {
		const instance = new Role(data);

		instance.permissions();

		return instance;
	}
}
