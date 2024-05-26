import { Role } from "../../../../../services/role/Role";
import { EmptyFn } from "../../../../../types/common";

export type CreateRoleProps = {
	open: boolean;
	onCancel: EmptyFn;
	onCreated: (role: Role) => void;
};
