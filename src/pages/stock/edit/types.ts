import { ProductStock } from "../../../services/product-stock/ProductStock";
import { UpdateProductStockSchema } from "../../../services/product-stock/types";
import { EmptyFn } from "../../../types/common";

export type EditStockProps = {
	open: boolean;
	stock: UpdateProductStockSchema;
	onUpdated?: (model: ProductStock) => void;
	onCancel: EmptyFn
}
