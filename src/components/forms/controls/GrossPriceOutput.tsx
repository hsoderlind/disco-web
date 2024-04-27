import { ComponentProps, Ref, forwardRef, useEffect } from 'react';
import { useGetTaxById } from '../../../services/tax/hooks/useGetTaxById';
import { useQuery } from '@tanstack/react-query';
import { Form, InputNumber } from 'antd';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';
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
	const { control, watch, setValue } = useFormContext();
	const netPrice = watch(netPriceFieldName);
	const taxId = watch(taxIdFieldName);
	const [queryKey, queryFn] = useGetTaxById(taxId!);
	const { data: tax } = useQuery(queryKey, queryFn, { enabled: typeof taxId !== 'undefined' });
	const form = Form.useFormInstance();
	const taxValue = typeof tax !== 'undefined' ? tax.get<number>('value') / 100 + 1.0 : 1;
	const priceInclVat = netPrice * taxValue;

	useEffect(() => {
		setValue(name, priceInclVat);
		form.setFieldValue(name, priceInclVat);
	}, [name, priceInclVat, form, setValue]);

	return (
		<FormItem control={control} name={name} label={label}>
			<InputNumber ref={ref} {...inputProps} decimalSeparator=',' readOnly />
		</FormItem>
	);
};

const GrossPriceOutput = forwardRef(InternalGrossPriceOutput);

export { GrossPriceOutput };
