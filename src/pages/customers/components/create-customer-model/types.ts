import { Customer } from "../../../../services/customer/Customer";

export type CreateCustomerModelProps = {
	open: boolean;
	onCancel?: () => void;
	onCreated?: (customer: Customer) => void;
};
