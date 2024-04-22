import { Divider, Form, Select, Space } from 'antd';
import { ComponentProps, ReactNode } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { useLoadBarcodeTypes } from '../../../services/barcode-type/hooks/useLoadBarcodeTypes';
import { BarcodeType } from '../../../services/barcode-type/BarcodeType';
import { CreateBarcodeTypeButton } from './CreateBarcodeTypeButton';

type SelectProps = ComponentProps<typeof Select>;
export type BarcodeTypeSelectProps<TFieldValues extends FieldValues = FieldValues> = Omit<
	SelectProps,
	'options' | 'dropdownRender'
> & {
	control: Control<TFieldValues>;
	name: Path<TFieldValues>;
};

export const BarcodeTypeSelect = <TFieldValues extends FieldValues = FieldValues>({
	control,
	name,
	...props
}: BarcodeTypeSelectProps<TFieldValues>) => {
	const form = Form.useFormInstance();
	const { field } = useController({ name, control, disabled: props.disabled });
	const { data, isFetching, isError } = useLoadBarcodeTypes();

	const handleCreated = (barcodeType: BarcodeType) => {
		field.onChange(barcodeType.getKey());
		form.setFieldValue(name, barcodeType.getKey());
	};

	props.disabled = props.disabled || isFetching || isError;

	let placeholder: ReactNode;

	if (isFetching) {
		placeholder = 'Laddar produktkodstyper...';
	} else if (isError) {
		placeholder = 'Något gick fel!';
	} else {
		placeholder = props.placeholder ?? 'Välj produktkodstyp';
	}

	return (
		<Select
			{...props}
			placeholder={placeholder}
			options={data?.map((barcodeType) => ({
				value: barcodeType.getKey(),
				label: barcodeType.get<string>('label')
			}))}
			dropdownRender={(menu) => (
				<>
					{menu}
					<Divider style={{ margin: '8px 0' }} />
					<Space style={{ margin: '0 8px 4px' }}>
						<CreateBarcodeTypeButton onCreated={handleCreated} />
					</Space>
				</>
			)}
		/>
	);
};
