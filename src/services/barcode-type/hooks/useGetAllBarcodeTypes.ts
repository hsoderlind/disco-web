import { BarcodeTypeCollection } from "../BarcodeTypeCollection"

export const useGetAllBarcodeTypes = (shopId: number) => {
	const queryKey = [BarcodeTypeCollection.GET_BARCODE_TYPES_URI, shopId] as const;
	const queryFn = () => BarcodeTypeCollection.fetchAll(shopId);

	return [queryKey, queryFn] as const;
}
