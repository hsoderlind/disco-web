import { useFormContext, useWatch } from 'react-hook-form';
import { CheckoutTemplate } from '../../../../_templates/checkout';
import { CheckoutComponentProps } from '../../types';
import { CreateOrderSchema } from '../../../../../types';
import { useEffect, useMemo } from 'react';

const TotalCheckout = ({ name, title, sort_order }: CheckoutComponentProps) => {
	const { control, setValue } = useFormContext<CreateOrderSchema>();
	const orderItems = useWatch({ control, name: 'items' });
	const fees = useWatch({ control, name: 'fees' });

	const total = useMemo(() => {
		const itemsTotal = (orderItems ?? []).reduce((acc, item) => acc + item.total + item.vat * item.quantity, 0);
		const feesTotal = (Object.values(fees ?? {}) ?? []).reduce((acc, fee) => acc + fee.value + fee.vat, 0);
		return itemsTotal + feesTotal;
	}, [orderItems, fees]);

	useEffect(() => {
		setValue('totals.total', {
			name,
			entries: [
				{
					label: title,
					value: total,
					sort_order: 1
				}
			],
			sort_order
		});
	}, [total, setValue, title, sort_order, name]);

	return <CheckoutTemplate title={title} value={total} />;
};

export default TotalCheckout;
