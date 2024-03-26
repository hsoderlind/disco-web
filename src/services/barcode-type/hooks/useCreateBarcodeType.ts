import { BarcodeType } from "../BarcodeType"
import { BarcodeTypeSchemaType } from "../types"

export const useCreateBarcodeType = (shopId: number) => {
	const queryFn = (data: BarcodeTypeSchemaType) => {
		const barcodeType = new BarcodeType(data, shopId);
		return barcodeType.create();
	}

	return [queryFn] as const;
}
