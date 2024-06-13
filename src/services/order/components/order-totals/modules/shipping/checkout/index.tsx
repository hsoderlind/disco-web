import { useFormContext, useWatch } from 'react-hook-form';
import { CheckoutComponentProps } from '../../types';
import { CreateOrderItemSchema, CreateOrderSchema } from '../../../../../types';
import { useEffect, useMemo } from 'react';
import { CheckoutTemplate } from '../../../../_templates/checkout';

export const ShippingCheckout = ({ name, title, sort_order }: CheckoutComponentProps) => {
	const { control, setValue } = useFormContext<CreateOrderSchema>();
	const orderItems = useWatch({ control, name: 'items' });
	const shippingMethod = useWatch({ control, name: 'shipping_method' });

	const shipping = useMemo(() => {
		if (typeof shippingMethod === 'undefined') {
			return {
				fee: 0,
				vat: 0,
				total: 0
			} as const;
		}

		if (shippingMethod.fee === 0) {
			return {
				fee: 0,
				vat: 0,
				total: 0
			} as const;
		}

		if (typeof orderItems === 'undefined') {
			return {
				fee: 0,
				vat: 0,
				total: 0
			} as const;
		}

		const vatGroups = groupByVat(orderItems);
		const shippingVat = calcShippingVat(shippingMethod.fee, vatGroups);

		const shippingTotal = shippingMethod.fee + shippingVat;
		return {
			fee: shippingMethod.fee,
			vat: shippingVat,
			total: shippingTotal
		} as const;
	}, [orderItems, shippingMethod]);

	useEffect(() => {
		setValue('totals.shipping', {
			name,
			entries: [
				{
					label: title,
					value: shipping.fee,
					vat: shipping.vat,
					sort_order: 1
				}
			],
			sort_order
		});
		setValue('fees.shipping', {
			value: shipping.fee,
			vat: shipping.vat
		});
	}, [shipping, setValue, title, sort_order, name]);

	return <CheckoutTemplate title={title} value={shipping.total} />;
};

type VatGroup = {
	tax_value: number;
	percentage: number;
};

type ReducedOrderItem = Pick<CreateOrderItemSchema, 'tax_value' | 'quantity'>;

function groupByVat(orderItems: ReducedOrderItem[]) {
	const vatCount: Record<number, number> = {};
	const totalItems = orderItems.reduce((acc, item) => acc + item.quantity, 0);

	orderItems.forEach((item) => {
		if (vatCount[item.tax_value]) {
			vatCount[item.tax_value] += item.quantity;
		} else {
			vatCount[item.tax_value] = item.quantity;
		}
	});

	return Object.keys(vatCount).map((taxValue) => ({
		tax_value: +taxValue,
		percentage: (vatCount[+taxValue] / totalItems) * 100
	}));
}

function calcShippingVat(shippingFee: number, vatGroups: VatGroup[]) {
	let totalVat = 0;

	vatGroups.forEach((group) => {
		totalVat += (group.tax_value / 100) * (group.percentage / 100) * shippingFee;
	});

	return totalVat;
}
