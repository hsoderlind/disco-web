import { Select, SelectProps } from "antd";
import { ComponentRef } from "react";

export type OrderStatusSelectProps = Omit<SelectProps, 'options' | 'showSearch' | 'optionFilterProp' | 'loading'>;

export type OrderStatusSelectRef = ComponentRef<typeof Select>;
