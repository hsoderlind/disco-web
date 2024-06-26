import { useFormContext, useWatch } from 'react-hook-form';
import { CheckoutTemplate } from '../../../../_templates/checkout';
import { CheckoutComponentProps } from '../../types';
import { CreateOrderSchema } from '../../../../../types';
import { useEffect, useMemo } from 'react';

const TaxCheckout = ({ name, title, sort_order }: CheckoutComponentProps) => {
	const { control, setValue } = useFormContext<CreateOrderSchema>();
	const orderItems = useWatch({ control, name: 'items' });
	const fees = useWatch({ control, name: 'fees' });

	const vat = useMemo(() => {
		const itemsTotalVat = (orderItems ?? []).reduce((acc, item) => acc + item.vat * item.quantity, 0);
		const feesTotalVat = (Object.values(fees ?? {}) ?? []).reduce((acc, fee) => acc + fee.vat, 0);
		return itemsTotalVat + feesTotalVat;
	}, [orderItems, fees]);

	useEffect(() => {
		setValue('totals.tax', {
			name,
			entries: [
				{
					label: title,
					value: vat,
					sort_order: 1
				}
			],
			sort_order
		});
	}, [vat, setValue, title, sort_order, name]);

	return <CheckoutTemplate title={title} value={vat} />;
};

export default TaxCheckout;
