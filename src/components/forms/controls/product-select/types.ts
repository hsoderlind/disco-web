import { Select, SelectProps } from "antd";
import { ComponentRef } from "react";
import { Criteria } from "../../../../services/product/types";
import { Product } from "../../../../services/product/Product";

export type ProductSelectProps = {
	category?: Criteria['category'];
	includeSubcategories?: Criteria['includeSubcategories'];
	state?: Criteria['state'];
	onChange?: (product: Product) => void;
} & Omit<SelectProps, 'options' | 'optionRenderer' | 'showSearch' | 'onChange'>;

export type SelectRef = ComponentRef<typeof Select>;
