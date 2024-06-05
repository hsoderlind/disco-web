import { useFormContext, useWatch } from 'react-hook-form';
import { CheckoutTemplate } from '../../../../_templates/checkout';
import { CheckoutComponentProps } from '../../types';
import { CreateOrderSchema } from '../../../../../types';
import { useMemo } from 'react';

const TotalCheckout = ({ title }: CheckoutComponentProps) => {
	const { control } = useFormContext<CreateOrderSchema>();
	const orderItems = useWatch({ control, name: 'items' });

	const total = useMemo(() => {
		return (orderItems ?? []).reduce((acc, item) => acc + item.total + item.vat * item.quantity, 0);
	}, [orderItems]);

	return <CheckoutTemplate title={title} value={total} />;
};

export default TotalCheckout;
