import { ComponentProps, ReactNode } from 'react';
import { useLoadAttributeValuesByAttributeType } from '../../../services/product-attribute/hooks/useLoadAttributeValuesByAttributeType';
import { Divider, Select, Space } from 'antd';
import { CreateAttributeValueButton } from './CreateAttributeValueButton';
import { Control, FieldPath, FieldValues, Path, useController } from 'react-hook-form';
import { AttributeValue } from '../../../services/product-attribute/AttributeValue';

type SelectProps = ComponentProps<typeof Select>;
export type AttributeValueSelectProps<TFieldValues extends FieldValues = FieldValues> = Omit<
	SelectProps,
	'options' | 'dropdownRender'
> & {
	control: Control<TFieldValues>;
	connectedFieldName: FieldPath<TFieldValues>;
	name?: Path<TFieldValues>;
};

export const AttributeValueSelect = <TFieldValues extends FieldValues = FieldValues>({
	control,
	connectedFieldName,
	...rest
}: AttributeValueSelectProps<TFieldValues>) => {
	const { field: connectedField } = useController({ name: connectedFieldName, control });
	const attributeTypeId = connectedField.value;
	const { field } = useController({ name: rest.name!, control, disabled: rest.disabled });
	const { data, isFetching, isError } = useLoadAttributeValuesByAttributeType(attributeTypeId);
	let placeholder: ReactNode;
	const disabled = isFetching || isError;

	const onCreated = (attributeValue: AttributeValue) => {
		field.onChange(attributeValue.getKey());
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
