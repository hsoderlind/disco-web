import { ComponentProps, useEffect } from 'react';
import { useGetTaxById } from '../../../services/tax/hooks/useGetTaxById';
import { useQuery } from '@tanstack/react-query';
import { Form, InputNumber } from 'antd';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

export type GrossPriceOutputProps<TFieldValues extends FieldValues = FieldValues> = {
	name: string;
	label?: string;
	initialValue?: number;
	control: Control<TFieldValues>;
	netPriceFieldName: FieldPath<TFieldValues>;
	taxIdFieldName: FieldPath<TFieldValues>;
} & ComponentProps<typeof InputNumber>;

export const GrossPriceOutput = <TFieldValues extends FieldValues = FieldValues>({
	name,
	control,
	netPriceFieldName,
	taxIdFieldName,
	label,
	initialValue = 0,
	...inputProps
}: GrossPriceOutputProps<TFieldValues>) => {
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
			<InputNumber {...inputProps} readOnly />
		</Form.Item>
	);
};
