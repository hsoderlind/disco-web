import app from "../../lib/application-builder/ApplicationBuilder";
import { id, vsbInfer } from "../../lib/validation/validation-schema-builder";
import { PermissionCollection } from "./PermissionCollection";

const vsb = app.getValidationSchemaBuilder();

export const permissionSchema = vsb.object({
	id: id.optional(),
	name: vsb.string(),
	group: vsb.string(),
	description: vsb.string()
});

export const syncPermissionsWithRoleSchema = vsb.object({
	roleId: id,
	permissions: vsb.array(vsb.string())
});

export type PermissionSchema = vsbInfer<typeof permissionSchema>;

export type SyncPermissionsWithRoleSchema = vsbInfer<typeof syncPermissionsWithRoleSchema>;

export type UserPermissionsStore = {
	permissions: PermissionCollection;
	update: (permissions: PermissionCollection) => void;
}
