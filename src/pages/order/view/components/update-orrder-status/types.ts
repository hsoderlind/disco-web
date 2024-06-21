import { EmptyFn } from "../../../../../types/common";

export type UpdateOrderStatusProps = {
	open: boolean;
	orderId: number;
	onCancel?: EmptyFn;
	onUpdated?: EmptyFn;
}
