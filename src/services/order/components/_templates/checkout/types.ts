import { ReactNode } from "react";
import { OrderTotalRepositorySchema } from "../../../types"

export type CheckoutTemplateProps = {
	title: OrderTotalRepositorySchema['title'] | ReactNode;
	value: number;
}
