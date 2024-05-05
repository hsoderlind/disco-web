import { useFindReleaseStats } from '../../../../services/discogs/release/hooks/useFindReleaseStats';
import { Card, Descriptions, DescriptionsProps } from 'antd';
import { Num } from '../../../../lib/number/Num';
import { ReleaseStatsProps } from './types';
import { RatingSchema } from '../../../../services/discogs/types';

export const ReleaseStats = ({ releaseId }: ReleaseStatsProps) => {
	const { data: stats, isLoading, isFetching } = useFindReleaseStats(releaseId);

	const items: DescriptionsProps['items'] = [
		{
			key: 'num_have',
			label: 'Finns på Discogs',
			children: `${Num.localeString(stats?.get<number>('num_have') ?? 0)}st`
		},
		{
			key: 'num_want',
			label: 'Efterfrågade på Discogs',
			children: `${Num.localeString(stats?.get<number>('num_want') ?? 0)}st`
		},
		{
			key: 'rating.average',
			label: 'Genomsnittligt betyg',
			children: `${Num.decimal(stats?.get<RatingSchema>('rating')?.['average'] ?? 0)} / 5`
		},
		{
			key: 'rating.count',
			label: 'Betygsättningar',
			children: `${Num.localeString(stats?.get<RatingSchema>('rating')?.['count'] ?? 0)}st`
		}
	];

	return (
		<Card title='Statistik' loading={isLoading || isFetching}>
			<Descriptions size='small' layout='vertical' column={1} items={items} />
		</Card>
	);
};
