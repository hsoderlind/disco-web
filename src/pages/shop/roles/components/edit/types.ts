import { Role } from "../../../../../services/role/Role";
import { RoleType } from "../../../../../services/role/ttypes";
import { EmptyFn } from "../../../../../types/common";

export type EditRoleProps = {
	open: boolean;
	role: RoleType;
	onCancel?: EmptyFn;
	onUpdated?: (role: Role) => void;
}
