import { Select, SelectProps } from "antd";
import { ComponentRef } from "react";

export type CustomerSelectProps = Omit<SelectProps, 'options' | 'showSearch' | 'optionFilterProp' | 'loading'>;

export type CustomerSelectRef = ComponentRef<typeof Select>;
