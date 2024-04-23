import { ComponentProps, Ref, forwardRef, useEffect } from 'react';
import { useGetTaxById } from '../../../services/tax/hooks/useGetTaxById';
import { useQuery } from '@tanstack/react-query';
import { Form, InputNumber } from 'antd';
import { FieldPath, FieldValues, useController, useFormContext } from 'react-hook-form';
import FormItem from '../../../lib/form/FormItem';

export type GrossPriceOutputProps<TFieldValues extends FieldValues = FieldValues> = {
	name: string;
	label?: string;
	netPriceFieldName: FieldPath<TFieldValues>;
	taxIdFieldName: FieldPath<TFieldValues>;
} & ComponentProps<typeof InputNumber>;

const InternalGrossPriceOutput = <TFieldValues extends FieldValues = FieldValues>(
	{ name, netPriceFieldName, taxIdFieldName, label, ...inputProps }: GrossPriceOutputProps<TFieldValues>,
	ref: Ref<HTMLInputElement>
) => {
	const { control } = useFormContext();
	const { field: netPriceField } = useController({ name: netPriceFieldName, control });
	const { field: taxIdField } = useController({ name: taxIdFieldName, control });
	const { field } = useController({ control, name });
	const netPrice = netPriceField.value;
	const taxId = taxIdField.value;
	const [queryKey, queryFn] = useGetTaxById(taxId!);
	const { data: tax } = useQuery(queryKey, queryFn, { enabled: typeof taxId !== 'undefined' });
	const form = Form.useFormInstance();

	useEffect(() => {
		if (typeof tax !== 'undefined' && typeof netPrice !== 'undefined') {
			const taxValue = tax.get<number>('value') / 100 + 1.0;
			const priceInclVat = netPrice * taxValue;
			form.setFieldValue(name, priceInclVat);
			field.onChange(priceInclVat);
		} else if (typeof tax === 'undefined' && typeof netPrice !== 'undefined') {
			form.setFieldValue(name, netPrice);
			field.onChange(netPrice);
		}
	}, [form, tax, taxId, netPrice, name, field]);

	return (
		<FormItem control={control} name={name} label={label}>
			<InputNumber ref={ref} {...inputProps} decimalSeparator=',' readOnly />
		</FormItem>
	);
};

const GrossPriceOutput = forwardRef(InternalGrossPriceOutput);

export { GrossPriceOutput };
