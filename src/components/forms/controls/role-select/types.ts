import { Select, SelectProps } from "antd";
import { ComponentRef } from "react";

export type RoleSelectProps = {
	showAccountOwner?: boolean;
} & Omit<SelectProps, 'options' | 'placeholder'>;
export type SelectRef = ComponentRef<typeof Select>;

