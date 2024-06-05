import { ReactNode } from "react"
import { PaymentMethodSchema } from "../../../types"

export type CheckoutTemplateProps = {
	name: PaymentMethodSchema['name'];
	title: PaymentMethodSchema['title'] | ReactNode;
	description?: PaymentMethodSchema['description'] | ReactNode;
	fee?: PaymentMethodSchema['fee'];
	children?: ReactNode;
	logotype?: PaymentMethodSchema['logotype'] | ReactNode;
}
