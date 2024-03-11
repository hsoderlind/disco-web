import { Tax } from "../Tax"
import { TaxSchemaType } from "../types"

export const useCreateTaxClass = (shopId: number) => {
	const queryFn = (data: TaxSchemaType) => {
		const tax = new Tax(data, shopId);
		return tax.create();
	}

	return [queryFn] as const;
}
