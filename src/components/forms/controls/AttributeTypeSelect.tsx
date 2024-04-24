import { Divider, Form, Select, Space } from 'antd';
import { ComponentProps, FC, ReactNode } from 'react';
import { Path, useController, useFormContext } from 'react-hook-form';
import { AttributeType } from '../../../services/product-attribute/AttributeType';
import { useLoadAllAttributeTypes } from '../../../services/product-attribute/hooks/useLoadAllAttributeTypes';
import { CreateAttributeTypeButton } from './CreateAttributeTypeButton';
import { ProductSchemaType } from '../../../services/product/types';

type SelectProps = ComponentProps<typeof Select>;

export type AttributeTypeSelectProps = Omit<SelectProps, 'options' | 'dropdownRender'> & {
	name: Path<ProductSchemaType>;
};

export const AttributeTypeSelect: FC<AttributeTypeSelectProps> = ({ name, ...props }) => {
	const form = Form.useFormInstance();
	const { control } = useFormContext<ProductSchemaType>();
	const { field } = useController({ control, name, disabled: props.disabled });
	const { data, isFetching, isError } = useLoadAllAttributeTypes(name);

	const handleCreated = (attributeType: AttributeType) => {
		field.onChange(attributeType.getKey());
		form.setFieldValue(name, attributeType.getKey());
	};

	props.disabled = props.disabled || isFetching || isError;

	let placeholder: ReactNode;

	if (isFetching) {
		placeholder = 'Laddar attributtyper...';
	} else if (isError) {
		placeholder = 'Något gick fel!';
	} else {
		placeholder = props.placeholder ?? 'Välj attributtyp';
	}

	return (
		<Select
			{...props}
			placeholder={placeholder}
			options={data?.map((attributeType) => ({
				value: attributeType.getKey(),
				label: attributeType.get<string>('label')
			}))}
			dropdownRender={(menu) => (
				<>
					{menu}
					<Divider style={{ margin: '8px 0' }} />
					<Space style={{ margin: '0 8px 4px' }}>
						<CreateAttributeTypeButton onCreated={handleCreated} />
					</Space>
				</>
			)}
		/>
	);
};
