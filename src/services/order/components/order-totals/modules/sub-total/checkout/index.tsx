import { useFormContext, useWatch } from 'react-hook-form';
import { CheckoutTemplate } from '../../../../_templates/checkout';
import { CheckoutComponentProps } from '../../types';
import { CreateOrderSchema } from '../../../../../types';
import { useEffect, useMemo } from 'react';

const SubTotalCheckout = ({ name, title, sort_order }: CheckoutComponentProps) => {
	const { control, setValue } = useFormContext<CreateOrderSchema>();
	const orderItems = useWatch({ control, name: 'items' });

	const subTotal = useMemo(() => {
		return (orderItems ?? []).reduce((acc, item) => acc + item.total, 0);
	}, [orderItems]);

	useEffect(() => {
		setValue('totals.subtotal', {
			name,
			entries: [
				{
					label: title,
					value: subTotal,
					sort_order: 1
				}
			],
			sort_order
		});
	}, [subTotal, setValue, title, sort_order, name]);

	return <CheckoutTemplate title={title} value={subTotal} />;
};

export default SubTotalCheckout;
