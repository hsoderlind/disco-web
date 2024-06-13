import { Card } from 'antd';
import { useListOrderTotals } from '../../../../services/order/hooks/useListOrderTotals';
import SubTotalCheckout from '../../../../services/order/components/order-totals/modules/sub-total/checkout';
import TaxCheckout from '../../../../services/order/components/order-totals/modules/tax/checkout';
import TotalCheckout from '../../../../services/order/components/order-totals/modules/total/checkout';
import { OrderTotalsCardProps } from './types';
import { ShippingCheckout } from '../../../../services/order/components/order-totals/modules/shipping/checkout';

const MAP_MODEL_TO_COMPONENT: Record<string, (...args: any[]) => JSX.Element> = {
	subtotal: SubTotalCheckout,
	tax: TaxCheckout,
	total: TotalCheckout,
	shipping: ShippingCheckout
};

export const OrderTotalsCard = ({ style }: OrderTotalsCardProps) => {
	const { data: orderTotals, isFetching, isLoading } = useListOrderTotals();

	return (
		<Card loading={isFetching || isLoading} style={style}>
			{orderTotals?.getItems().map((model) => {
				const Component = MAP_MODEL_TO_COMPONENT[model.getKey()];

				return Component ? <Component {...model.toJSON()} /> : null;
			})}
		</Card>
	);
};
