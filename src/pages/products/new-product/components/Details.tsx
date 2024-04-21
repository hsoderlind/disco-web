import { Button, Col, Divider, Input, Row, Segmented, Select, Space, Typography } from 'antd';
import { FC } from 'react';
import FormItem from '../../../../lib/form/FormItem';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ProductConditions } from '../../../../services/product/ProductConditions';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { ProductSchemaType } from '../../../../services/product/types';
import { useLoadBarcodeTypes } from '../../../../services/barcode-type/hooks/useLoadBarcodeTypes';
import { CreateBarcodeTypeButton } from '../../../../components/forms/controls/CreateBarcodeTypeButton';
import { Str } from '../../../../lib/string/Str';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export const Details: FC = () => {
	const { control } = useFormContext<ProductSchemaType>();
	const { fields, append, remove } = useFieldArray({ control, name: 'barcodes', keyName: 'key' });
	const barcodeTypeQuery = useLoadBarcodeTypes();

	const [parent] = useAutoAnimate();

	return (
		<>
			<Typography.Title level={2}>Märkning</Typography.Title>
			<FormItem control={control} name='condition' label='Produktens skick'>
				<Segmented<string>
					options={[
						{
							label: 'Ny',
							value: ProductConditions.NEW
						},
						{
							label: 'Begagnad',
							value: ProductConditions.USED
						},
						{
							label: 'Renoverad',
							value: ProductConditions.REFURBISHED
						}
					]}
				/>
			</FormItem>
			<Row gutter={[12, 0]}>
				<Col sm={24} md={12}>
					<FormItem control={control} name='reference' label='Referens'>
						<Input />
					</FormItem>
				</Col>
			</Row>
			<Divider />
			<Typography.Title level={2}>Produktkoder</Typography.Title>
			<div ref={parent}>
				{fields.map((barcode, index) => (
					<Row gutter={[12, 0]} key={barcode.key}>
						<Col xl={5}>
							<FormItem
								control={control}
								name={`barcodes.${index}.barcode_type`}
								label={index === 0 ? 'Produktkodstyp' : ''}>
								<Select
									placeholder='Välj streckkodstyp'
									options={barcodeTypeQuery.data?.map((barcodeType) => ({
										value: barcodeType.getKey(),
										label: barcodeType.get<string>('label')
									}))}
									dropdownRender={(menu) => (
										<>
											{menu}
											<Divider style={{ margin: '8px 0' }} />
											<Space style={{ margin: '0 8px 4px' }}>
												<CreateBarcodeTypeButton />
											</Space>
										</>
									)}
								/>
							</FormItem>
						</Col>
						<Col xl={5}>
							<FormItem control={control} name={`barcodes.${index}.value`} label={index === 0 ? 'Produktkod' : ''}>
								<Input />
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
			<Button
				icon={<PlusOutlined />}
				onClick={() => {
					append({
						key: Str.uuid(),
						value: '',
						barcode_type: null!
					});
				}}>
				Lägg till produktkod
			</Button>
		</>
	);
};
