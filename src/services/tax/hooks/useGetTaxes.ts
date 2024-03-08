import { TaxCollection } from "../TaxCollection"

export const useGetTaxes = (shopId: number, withInactive = false) => {
	const queryKey = [TaxCollection.GET_TAXES_URI] as const;
	const queryFn = () => TaxCollection.fetchAll(shopId, withInactive);

	return [queryKey, queryFn] as const;
}
