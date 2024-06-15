import { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ProductSchemaType } from '../../../services/product/types';
import { Button, Col, Row, Typography } from 'antd';
import FormItem from '../../../lib/form/FormItem';
import { AttributeValueSelect } from '../../../components/forms/controls/AttributeValueSelect';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { AttributeTypeSelect } from '../../../components/forms/controls/AttributeTypeSelect';

export const ProductsAttributes: FC = () => {
	const { control } = useFormContext<ProductSchemaType>();
	const { fields, append, remove } = useFieldArray({ control, name: 'product_attributes', keyName: 'key' });

	const [parent] = useAutoAnimate();

	const newProductAttribute = () =>
		append({
			active: true,
			attribute_type_id: null!,
			attribute_value_id: null!,
			sort_order: 0
		});

	return (
		<>
			<Typography.Title level={2}>Features</Typography.Title>
			<div ref={parent}>
				{fields.map((productAttribute, index) => (
					<Row gutter={[12, 0]} key={productAttribute.key}>
						<Col xl={5}>
							<FormItem
								control={control}
								name={`product_attributes.${index}.attribute_type_id`}
								label={index === 0 ? 'Attributtyp' : ''}>
								<AttributeTypeSelect name={`product_attributes.${index}.attribute_type_id`} />
							</FormItem>
						</Col>
						<Col xl={5}>
							<FormItem
								control={control}
								name={`product_attributes.${index}.attribute_value_id`}
								label={index === 0 ? 'Attributvärde' : ''}>
								<AttributeValueSelect
									name={`product_attributes.${index}.attribute_value_id`}
									connectedFieldName={`product_attributes.${index}.attribute_type_id`}
								/>
							</FormItem>
						</Col>
						<Col flex='auto'>
							<Button
								type='link'
								icon={<DeleteOutlined />}
								onClick={() => remove(index)}
								style={{ marginBlockStart: index === 0 ? '32px' : undefined }}
								danger
							/>
						</Col>
					</Row>
				))}
			</div>
			<Button icon={<PlusOutlined />} onClick={newProductAttribute}>
				Lägg till feature
			</Button>
		</>
	);
};
