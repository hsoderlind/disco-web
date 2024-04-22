import { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ProductSchemaType } from '../../../../services/product/types';
import { Button, Col, DatePicker, Divider, Input, InputNumber, Row, Select, Space, Switch, Typography } from 'antd';
import { ExpandableControl } from '../../../../components/forms/controls/ExpandableControl';
import FormItem from '../../../../lib/form/FormItem';
import { AttributeValueSelect } from '../../../../components/forms/controls/AttributeValueSelect';
import { CheckOutlined, CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { CreateAttributeTypeButton } from '../../../../components/forms/controls/CreateAttributeTypeButton';
import dayjs from 'dayjs';
import { useLoadAllAttributeTypes } from '../../../../services/product-attribute/hooks/useLoadAllAttributeTypes';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export const ProductsAttributes: FC = () => {
	const { control } = useFormContext<ProductSchemaType>();
	const { fields, append, remove } = useFieldArray({ control, name: 'product_attributes', keyName: 'key' });
	const attributeTypeQuery = useLoadAllAttributeTypes();

	const [parent] = useAutoAnimate();

	const newProductAttribute = () =>
		append({
			active: true,
			attribute_type_id: null!,
			attribute_value_id: null!,
			sort_order: 0,
			stock: {
				allow_order_out_of_stock: false,
				initial_quantity: 0,
				available_at: dayjs(),
				out_of_stock_message: 'Slutsåld',
				reserved_quantity: 0,
				sku: '',
				sold_quantity: 0,
				stock_unit: ''
			}
		});

	return (
		<>
			<Typography.Title level={2}>Features</Typography.Title>
			<div ref={parent}>
				{fields.map((productAttribute, index) => (
					<ExpandableControl
						key={productAttribute.key}
						renderVisibleContent={(toggle) => (
							<Row gutter={[12, 0]}>
								<Col xl={5}>
									<FormItem
										control={control}
										name={`product_attributes.${index}.attribute_type_id`}
										label={index === 0 ? 'Attributtyp' : ''}>
										<Select
											placeholder='Välj attributtyp'
											options={attributeTypeQuery.data?.map((attributeType) => ({
												value: attributeType.getKey(),
												label: attributeType.get<string>('label')
											}))}
											dropdownRender={(menu) => (
												<>
													{menu}
													<Divider style={{ margin: '8px 0' }} />
													<Space style={{ margin: '0 8px 4px' }}>
														<CreateAttributeTypeButton />
													</Space>
												</>
											)}
										/>
									</FormItem>
								</Col>
								<Col xl={5}>
									<FormItem
										control={control}
										name={`product_attributes.${index}.attribute_value_id`}
										label={index === 0 ? 'Attributvärde' : ''}>
										<AttributeValueSelect
											control={control}
											name={`product_attributes.${index}.attribute_value_id`}
											connectedFieldName={`product_attributes.${index}.attribute_type_id`}
										/>
									</FormItem>
								</Col>
								<Col flex='100px'>
									<Button type='link' onClick={toggle} style={{ marginBlockStart: index === 0 ? '32px' : undefined }}>
										Skapa lager
									</Button>
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
						)}
						renderExpandableContent={
							<>
								<FormItem control={control} name={`product_attributes.${index}.stock.sku`} label='SKU'>
									<Input />
								</FormItem>
								<FormItem
									control={control}
									name={`product_attributes.${index}.stock.initial_quantity`}
									label='Lagersaldo'>
									<InputNumber />
								</FormItem>
								<Row gutter={[12, 0]}>
									<Col xl={5}>
										<FormItem
											control={control}
											name={`product_attributes.${index}.stock.available_at`}
											label='Tillgänglig från'>
											<DatePicker />
										</FormItem>
									</Col>
									<Col flex='auto'>
										<FormItem
											control={control}
											name={`product_attributes.${index}.stock.allow_order_out_of_stock`}
											label='Tillåt beställning vid slutsåld'
											valuePropName='checked'>
											<Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
										</FormItem>
									</Col>
								</Row>
								<FormItem
									control={control}
									name={`product_attributes.${index}.stock.out_of_stock_message`}
									label='Meddelande vid slutsåld'>
									<Input />
								</FormItem>
							</>
						}
					/>
				))}
			</div>
			<Button icon={<PlusOutlined />} onClick={newProductAttribute}>
				Lägg till feature
			</Button>
		</>
	);
};
