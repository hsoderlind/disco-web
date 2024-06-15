import { InputNumberProps as AntdInputNumberProps, InputNumber } from "antd";
import { ComponentRef } from "react";

export type ValueType = string | number;

export type InputNumberProps<T extends ValueType = ValueType> = Omit<AntdInputNumberProps<T>, 'decimalSeparator'>;

export type InputNumberRef = ComponentRef<typeof InputNumber>;
