import { useMutation } from "@tanstack/react-query";
import { ServerValidationError } from "../../../lib/error/types";
import { UseMutationOptions } from "../../../types/common";
import { useShopStore } from "../../shop/store";
import { ProductStock } from "../ProductStock";
import { ProductStockType, UpdateProductStockSchema } from "../types";

export const useUpdateProductStock = (id: ProductStockType['id'], options?: UseMutationOptions<ProductStock, ServerValidationError, UpdateProductStockSchema>) => {
	const shopId = useShopStore(state => state.shop.id);
	const mutationFn = (formValues: UpdateProductStockSchema) => ProductStock.make({...formValues, id}, shopId).update();

	return useMutation(mutationFn, options);
}
