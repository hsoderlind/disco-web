import { ComponentProps, ReactNode } from 'react';
import { useLoadAttributeValuesByAttributeType } from '../../../services/product-attribute/hooks/useLoadAttributeValuesByAttributeType';
import { Divider, Form, Select, Space } from 'antd';
import { CreateAttributeValueButton } from './CreateAttributeValueButton';
import { FieldPath, FieldValues, Path, useController, useFormContext } from 'react-hook-form';
import { AttributeValue } from '../../../services/product-attribute/AttributeValue';

type SelectProps = ComponentProps<typeof Select>;
export type AttributeValueSelectProps<TFieldValues extends FieldValues = FieldValues> = Omit<
	SelectProps,
	'options' | 'dropdownRender'
> & {
	connectedFieldName: FieldPath<TFieldValues>;
	name: Path<TFieldValues>;
};

export const AttributeValueSelect = <TFieldValues extends FieldValues = FieldValues>({
	connectedFieldName,
	name,
	...rest
}: AttributeValueSelectProps<TFieldValues>) => {
	const form = Form.useFormInstance();
	const { control, watch } = useFormContext();
	const attributeTypeId = watch(connectedFieldName);
	const { field } = useController({ name: name!, control, disabled: rest.disabled });
	const { data, isFetching, isError } = useLoadAttributeValuesByAttributeType(attributeTypeId);
	let placeholder: ReactNode;
	const disabled = isFetching || isError;

	const onCreated = (attributeValue: AttributeValue) => {
		field.onChange(attributeValue.getKey());
		form.setFieldValue(name, attributeValue.getKey());
	};

	if (isFetching) {
		placeholder = 'Laddar attributvärden...';
	} else if (isError) {
		placeholder = 'Något gick fel!';
	} else {
		placeholder = rest.placeholder ?? 'Välj attributvärde';
	}

	if (disabled || attributeTypeId === null) {
		rest.disabled = true;
	}

	if (isError) {
		rest.status = 'error';
	}

	return (
		<Select
			{...rest}
			placeholder={placeholder}
			options={data?.map((item) => ({
				value: item.getKey(),
				label: item.get<string>('label')
			}))}
			dropdownRender={(menu) => (
				<>
					{menu}
					<Divider style={{ margin: '8px 0' }} />
					<Space style={{ margin: '0 8px 4px' }}>
						<CreateAttributeValueButton attributeTypeId={attributeTypeId!} onCreated={onCreated} />
					</Space>
				</>
			)}
		/>
	);
};
