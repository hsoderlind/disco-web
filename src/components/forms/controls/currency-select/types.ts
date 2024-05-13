import { Select } from "antd";
import { ComponentProps, ComponentRef } from "react";

type SelectProps = ComponentProps<typeof Select>;

export type CurrencySelectProps = Omit<SelectProps, 'options' | 'showSearch' | 'optionFilterProp'>
export type SelectRef = ComponentRef<typeof Select>;
