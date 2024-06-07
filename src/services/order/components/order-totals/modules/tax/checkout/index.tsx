import { useFormContext, useWatch } from 'react-hook-form';
import { CheckoutTemplate } from '../../../../_templates/checkout';
import { CheckoutComponentProps } from '../../types';
import { CreateOrderSchema } from '../../../../../types';
import { useEffect, useMemo } from 'react';

const TaxCheckout = ({ title, sort_order }: CheckoutComponentProps) => {
	const { control, setValue } = useFormContext<CreateOrderSchema>();
	const orderItems = useWatch({ control, name: 'items' });

	const vat = useMemo(() => {
		return (orderItems ?? []).reduce((acc, item) => acc + item.vat * item.quantity, 0);
	}, [orderItems]);

	useEffect(() => {
		setValue('totals.tax', {
			entries: [
				{
					label: title,
					value: vat,
					sort_order: 1
				}
			],
			sort_order
		});
	}, [vat, setValue, title, sort_order]);

	return <CheckoutTemplate title={title} value={vat} />;
};

export default TaxCheckout;
