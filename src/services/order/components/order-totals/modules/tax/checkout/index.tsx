import { useFormContext, useWatch } from 'react-hook-form';
import { CheckoutTemplate } from '../../../../_templates/checkout';
import { CheckoutComponentProps } from '../../types';
import { CreateOrderSchema } from '../../../../../types';
import { useMemo } from 'react';

const TaxCheckout = ({ title }: CheckoutComponentProps) => {
	const { control } = useFormContext<CreateOrderSchema>();
	const orderItems = useWatch({ control, name: 'items' });

	const vat = useMemo(() => {
		return (orderItems ?? []).reduce((acc, item) => acc + item.vat * item.quantity, 0);
	}, [orderItems]);

	return <CheckoutTemplate title={title} value={vat} />;
};

export default TaxCheckout;
