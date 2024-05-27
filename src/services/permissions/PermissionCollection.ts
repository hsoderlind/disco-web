import { Collection } from "../../lib/model/Collection";
import { Permission } from "./Permission";
import { PermissionSchema, SyncPermissionsWithRoleSchema } from "./types";

export class PermissionCollection extends Collection<PermissionSchema, 'id'> {
	static readonly ENDPOINT = '/api/permission';

	constructor(items: Permission[]) {
		super(items);
	}

	static createFromResponse(data: PermissionSchema[]) {
		const models = data.map((item) => Permission.make(item));

		return new PermissionCollection(models);
	}

	static async list(shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<PermissionSchema[]>(this.ENDPOINT);

		return this.createFromResponse(response.data);
	}

	static async listByRole(roleId: number, shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<PermissionSchema[]>(`${this.ENDPOINT}/${roleId}`);

		return this.createFromResponse(response.data);
	}

	static async syncWithRole(values: SyncPermissionsWithRoleSchema, shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.put<PermissionSchema[], SyncPermissionsWithRoleSchema>(`${this.ENDPOINT}/${values.roleId}`, values);

		return this.createFromResponse(response.data);
	}

	static async listUserPermissions(shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<PermissionSchema[]>(`${this.ENDPOINT}/user`);

		return this.createFromResponse(response.data);
	}
}
