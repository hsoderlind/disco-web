import { Model } from "../../lib/model/Model";
import { PermissionSchema } from "./types";

export class Permission extends Model<PermissionSchema, 'id'> {
	constructor(data: Partial<PermissionSchema>) {
		super('id', data);
	}

	static make(data: Partial<PermissionSchema>) {
		const instance = new Permission(data);

		return instance;
	}
}
