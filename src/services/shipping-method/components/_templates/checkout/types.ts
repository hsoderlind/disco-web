import { ReactNode } from "react";
import { ShippingMethodSchema } from "../../../types";

export type CheckoutTemplateProps = {
	children?: ReactNode;
} &ShippingMethodSchema;
