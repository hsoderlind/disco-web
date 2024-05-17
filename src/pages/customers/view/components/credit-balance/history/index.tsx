import { Timeline, TimelineItemProps, Typography } from 'antd';
import { useLoaderData } from '../../../../../../hooks/useLoaderData';
import { Customer } from '../../../../../../services/customer/Customer';
import { useLoadCreditBalanceHistory } from '../../../../../../services/customer/hooks/useLoadCreditBalanceHistory';
import { AdjustmentTypes } from '../../../../../../services/customer/AdjustmentTypes';
import { Currency } from '../../../../../../lib/number/Currency';
import { Dayjs } from 'dayjs';

export const CreditBalanceHistory = () => {
	const customer = useLoaderData<Customer>();
	const { data: creditBalanceHistory } = useLoadCreditBalanceHistory(customer.getKey()!);

	const items: TimelineItemProps[] = creditBalanceHistory
		? creditBalanceHistory?.map((item) => ({
				label: item.get<Dayjs>('created_at').format('L LT'),
				color: item.get('adjustment_type') === AdjustmentTypes.CREDIT ? 'green' : 'red',
				children: (
					<>
						<p>{`${item.get('adjustment_type') === AdjustmentTypes.CREDIT ? '+' : '-'}${Currency.format(
							item.get<number>('adjusted_balance')
						)}`}</p>
						<Typography.Paragraph className='white-space-pre-line' type='secondary'>
							{item.get<string>('note', '')}
						</Typography.Paragraph>
					</>
				)
		  }))
		: [];

	return items.length > 0 ? (
		<Timeline mode='left' items={items} />
	) : (
		<Typography.Text type='secondary' italic>
			Historik saknas
		</Typography.Text>
	);
};
