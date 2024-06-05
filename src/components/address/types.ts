import { ReactNode } from "react"
import { Account } from "../../services/account/Account";
import { CardProps } from "antd";

export type AddressProps = {
	className?: string;
	type?: CardProps['type'];
	title?: ReactNode;
	description?: ReactNode;
	address?: Account;
	extra?: CardProps['extra'];
	actions?: CardProps['actions'];
	loading?: boolean;
}
