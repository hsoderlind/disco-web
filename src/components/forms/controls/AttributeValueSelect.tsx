import { ComponentProps, FC, ReactNode } from 'react';
import { useLoadAttributeValuesByAttributeType } from '../../../services/product-attribute/hooks/useLoadAttributeValuesByAttributeType';
import { Divider, Select, Space } from 'antd';
import { CreateAttributeValueButton } from './CreateAttributeValueButton';

type SelectProps = ComponentProps<typeof Select>;
export type AttributeValueSelectProps = Omit<SelectProps, 'options' | 'dropdownRender'> & {
	attributeTypeId: number | null;
};

export const AttributeValueSelect: FC<AttributeValueSelectProps> = ({ attributeTypeId, ...rest }) => {
	const { data, isFetching, isError } = useLoadAttributeValuesByAttributeType(attributeTypeId);
	let placeholder: ReactNode;
	const disabled = isFetching || isError;

	if (isFetching) {
		placeholder = 'Laddar attributvärden...';
	} else if (isError) {
		placeholder = 'Något gick fel!';
	} else {
		placeholder = rest.placeholder ?? 'Välj attributvärde';
	}

	if (disabled) {
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
						<CreateAttributeValueButton attributeTypeId={attributeTypeId!} />
					</Space>
				</>
			)}
		/>
	);
};
