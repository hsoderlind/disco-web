import app from "../../lib/application-builder/ApplicationBuilder";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";
import { PermissionSchema } from "../permissions/types";

const vsb = app.getValidationSchemaBuilder();

export const roleSchema = vsb.object({
	name: vsb.string()
});

export type RoleSchema = vsbInfer<typeof roleSchema>;

export type RoleType = {
	id: number;
	editable: boolean;
	deletable: boolean;
	permissions?: PermissionSchema[]
} & RoleSchema;
