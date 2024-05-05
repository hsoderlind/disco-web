import { Card, Descriptions, DescriptionsProps } from 'antd';
import { useFindPriceSuggestions } from '../../../../services/discogs/marketplace/hooks/useFindPriceSuggestions';
import { PriceSuggestionsProps } from './types';
import { Currency } from '../../../../lib/number/Currency';
import { PriceSchema } from '../../../../services/discogs/marketplace/types';

export const PriceSuggestions = ({ releaseId }: PriceSuggestionsProps) => {
	const { data: priceSuggestions, isFetching, isLoading } = useFindPriceSuggestions(releaseId);

	const items: DescriptionsProps['items'] = priceSuggestions
		? [
				{
					key: 'Mint (M)',
					label: 'Mint (M)',
					children: Currency.format(
						priceSuggestions.get<PriceSchema>('Mint (M)').value,
						priceSuggestions.get<PriceSchema>('Mint (M)').currency
					)
				},
				{
					key: 'Near Mint (NM or M-)',
					label: 'Near Mint (NM or M-)',
					children: Currency.format(
						priceSuggestions.get<PriceSchema>('Near Mint (NM or M-)').value,
						priceSuggestions.get<PriceSchema>('Near Mint (NM or M-)').currency
					)
				},
				{
					key: 'Very Good Plus (VG+)',
					label: 'Very Good Plus (VG+)',
					children: Currency.format(
						priceSuggestions.get<PriceSchema>('Very Good Plus (VG+)').value,
						priceSuggestions.get<PriceSchema>('Very Good Plus (VG+)').currency
					)
				},
				{
					key: 'Very Good (VG)',
					label: 'Very Good (VG)',
					children: Currency.format(
						priceSuggestions.get<PriceSchema>('Very Good (VG)').value,
						priceSuggestions.get<PriceSchema>('Very Good (VG)').currency
					)
				},
				{
					key: 'Good Plus (G+)',
					label: 'Good Plus (G+)',
					children: Currency.format(
						priceSuggestions.get<PriceSchema>('Good Plus (G+)').value,
						priceSuggestions.get<PriceSchema>('Good Plus (G+)').currency
					)
				},
				{
					key: 'Good (G)',
					label: 'Good (G)',
					children: Currency.format(
						priceSuggestions.get<PriceSchema>('Good (G)').value,
						priceSuggestions.get<PriceSchema>('Good (G)').currency
					)
				},
				{
					key: 'Fair (F)',
					label: 'Fair (F)',
					children: Currency.format(
						priceSuggestions.get<PriceSchema>('Fair (F)').value,
						priceSuggestions.get<PriceSchema>('Fair (F)').currency
					)
				},
				{
					key: 'Poor (P)',
					label: 'Poor (P)',
					children: Currency.format(
						priceSuggestions.get<PriceSchema>('Poor (P)').value,
						priceSuggestions.get<PriceSchema>('Poor (P)').currency
					)
				}
		  ]
		: [];

	return (
		<Card title='Prisförslag' loading={isFetching || isLoading}>
			<Descriptions size='small' layout='vertical' column={1} items={items} />
		</Card>
	);
};
