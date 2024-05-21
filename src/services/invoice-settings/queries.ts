import { InvoiceSettings } from "./InvoiceSettings"

export const queryFindInvoiceSettings = (shopId: number) => {
	const model = new InvoiceSettings({}, shopId);
	const queryKey = [model.getEndpoint('read'), shopId];
	const queryFn = () => InvoiceSettings.find(shopId);

	return [queryKey, queryFn] as const;
}
