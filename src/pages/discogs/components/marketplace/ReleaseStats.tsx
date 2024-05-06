import { Card, Descriptions, DescriptionsProps } from 'antd';
import { useFindreleaseStats } from '../../../../services/discogs/marketplace/hooks/useFindReleaseStats';
import { ReleaseStatsProps } from './types';
import { Currency } from '../../../../lib/number/Currency';
import { PriceSchema } from '../../../../services/discogs/marketplace/types';
import { Num } from '../../../../lib/number/Num';

export const ReleaseStats = ({ releaseId }: ReleaseStatsProps) => {
	const { data: releaseStats, isFetching, isLoading } = useFindreleaseStats(releaseId);

	const items: DescriptionsProps['items'] = releaseStats
		? [
				{
					key: 'lowest_price',
					label: 'Lägsta pris',
					children: releaseStats.get<PriceSchema>('lowest_price')
						? Currency.format(
								releaseStats.get<PriceSchema>('lowest_price').value,
								releaseStats.get<PriceSchema>('lowest_price').currency
						  )
						: 'N/A'
				},
				{
					key: 'num_for_sale',
					label: 'Antal till försäljning',
					children: releaseStats.get('num_for_sale') ? `${Num.localeString(releaseStats.get('num_for_sale'))}st` : 'N/A'
				}
		  ]
		: [];

	return (
		<Card loading={isFetching || isLoading} title='Försäljningsstatistik' className='mb-4'>
			<Descriptions layout='horizontal' size='small' column={1} items={items} />
		</Card>
	);
};
