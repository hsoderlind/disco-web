import { ComponentProps, Ref, forwardRef, useEffect } from 'react';
import { useGetTaxById } from '../../../services/tax/hooks/useGetTaxById';
import { useQuery } from '@tanstack/react-query';
import { Form, InputNumber } from 'antd';
import { FieldPath, FieldValues, useController, useFormContext } from 'react-hook-form';

export type GrossPriceOutputProps<TFieldValues extends FieldValues = FieldValues> = {
	name: string;
	label?: string;
	initialValue?: number;
	netPriceFieldName: FieldPath<TFieldValues>;
	taxIdFieldName: FieldPath<TFieldValues>;
} & ComponentProps<typeof InputNumber>;

const InternalGrossPriceOutput = <TFieldValues extends FieldValues = FieldValues>(
	{
		name,
		netPriceFieldName,
		taxIdFieldName,
		label,
		initialValue = 0,
		...inputProps
	}: GrossPriceOutputProps<TFieldValues>,
	ref: Ref<HTMLInputElement>
) => {
	const { control } = useFormContext();
	const { field: netPriceField } = useController({ name: netPriceFieldName, control });
	const { field: taxIdField } = useController({ name: taxIdFieldName, control });
	const netPrice = netPriceField.value;
	const taxId = taxIdField.value;
	const [queryKey, queryFn] = useGetTaxById(taxId!);
	const { data: tax, isError } = useQuery(queryKey, queryFn, { enabled: typeof taxId !== 'undefined' });
	const form = Form.useFormInstance();

	useEffect(() => {
		if (typeof tax !== 'undefined' && typeof netPrice !== 'undefined') {
			const taxValue = tax.get<number>('value') / 100 + 1.0;
			const priceInclVat = netPrice * taxValue;
			form.setFieldValue(name, priceInclVat);
		} else if (typeof tax === 'undefined' && typeof netPrice !== 'undefined') {
			form.setFieldValue(name, netPrice);
		}
	}, [form, tax, taxId, netPrice, name]);

	return (
		<Form.Item name={name} label={label} initialValue={initialValue} validateStatus={isError ? 'error' : undefined}>
			<InputNumber ref={ref} {...inputProps} decimalSeparator=',' readOnly />
		</Form.Item>
	);
};

const GrossPriceOutput = forwardRef(InternalGrossPriceOutput);

export { GrossPriceOutput };
