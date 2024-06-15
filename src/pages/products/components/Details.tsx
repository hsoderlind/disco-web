import { Button, Col, Divider, Input, Row, Segmented, Typography } from 'antd';
import { FC } from 'react';
import FormItem from '../../../lib/form/FormItem';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ProductConditions } from '../../../services/product/ProductConditions';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { ProductSchemaType } from '../../../services/product/types';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { BarcodeTypeSelect } from '../../../components/forms/controls/BarcodeTypeSelect';
import { VisualBarcode } from './visual-barcode';

export const Details: FC = () => {
	const { control } = useFormContext<ProductSchemaType>();
	const { fields, append, remove } = useFieldArray({ control, name: 'barcodes', keyName: 'key' });

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
			<Row gutter={[12, 0]}>
				<Col sm={24} md={12}>
					<FormItem control={control} name='item_number' label='Artikelnummer'>
						<Input />
					</FormItem>
				</Col>
			</Row>
			<Divider />
			<Typography.Title level={2}>Produktkoder</Typography.Title>
			<div ref={parent}>
				{fields.map((barcode, index) => {
					return (
						<div key={barcode.key}>
							<Row gutter={[12, 0]}>
								<Col xl={5}>
									<FormItem
										control={control}
										name={`barcodes.${index}.barcode_type_id`}
										label={index === 0 ? 'Produktkodstyp' : ''}>
										<BarcodeTypeSelect control={control} name={`barcodes.${index}.barcode_type_id`} />
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
							<Row>
								<Col flex='auto'>
									<VisualBarcode
										id={`barcodes.${index}.barcode`}
										formatFrom={`barcodes.${index}.barcode_type_id`}
										name={`barcodes.${index}.value`}
									/>
								</Col>
							</Row>
						</div>
					);
				})}
			</div>
			<Button
				icon={<PlusOutlined />}
				onClick={() => {
					append({
						value: '',
						barcode_type_id: null!
					});
				}}>
				Lägg till produktkod
			</Button>
		</>
	);
};
