import { CreateOrderSchema } from './../../../../services/order/types';
import { UseFieldArrayRemove, UseFieldArrayUpdate } from "react-hook-form";
import { CreateOrderItemSchema } from "../../../../services/order/types"

export type OrderItemsTableProps = {
	items: CreateOrderItemSchema[];
	remove: UseFieldArrayRemove;
	update: UseFieldArrayUpdate<CreateOrderSchema, 'items'>
}
