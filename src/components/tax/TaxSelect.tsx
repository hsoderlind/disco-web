import { FC } from 'react';
import { useGetTaxes } from '../../services/tax/hooks/useGetTaxes';
import { useShopStore } from '../../services/shop/store';
import { useQuery } from '@tanstack/react-query';
import { Select } from 'antd';

export type TaxSelectProps = {
	withInactive?: boolean;
};

export const TaxSelect: FC<TaxSelectProps> = ({ withInactive = false }) => {
	const shopId = useShopStore((state) => state.shop.id);
	const [queryKey, queryFn] = useGetTaxes(shopId, withInactive);
	const { data: taxes, isFetching, isSuccess, isError } = useQuery(queryKey, queryFn);
	let placeholder = isFetching ? 'Laddar momssatser...' : 'Välj momssats';
	placeholder = !isFetching && isError ? 'Något gick fel' : placeholder;

	return (
		<Select
			options={isSuccess ? taxes.map((tax) => ({ value: tax.getKey(), label: tax.get<string>('name') })) : []}
			placeholder={placeholder}
			status={isError ? 'error' : undefined}
		/>
	);
};
