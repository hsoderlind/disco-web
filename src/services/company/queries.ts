import { Company } from "./Company"

export const queryFindCompany = (id: number, shopId: number) => {
	const model = new Company({}, shopId);
	const endpoint = model.getEndpoint('read');
	const queryKey = [endpoint, id];
	const queryFn = () => Company.find(id, shopId);

	return [queryKey, queryFn] as const;
}

export const queryCompanyForShop = (shopId: number) => {
	const model = new Company({}, shopId);
	const endpoint = model.getEndpoint('read');
	const queryKey = [endpoint, {shopId}];
	const queryFn = () => Company.forShop(shopId);

	return [queryKey, queryFn] as const;
}
