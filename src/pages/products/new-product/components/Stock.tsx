import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ProductSchemaType } from '../../../../services/product/types';
import { Col, DatePicker, Form, Input, InputNumber, Row, Switch, Typography } from 'antd';
import FormItem from '../../../../lib/form/FormItem';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

export const Stock: FC = () => {
	const [prevAttributeStockQuentity, setPrevAttributeStockQuantity] = useState<number>(0);
	const form = Form.useFormInstance<ProductSchemaType>();
	const { control, getValues, setValue } = useFormContext<ProductSchemaType>();
	const productAttributes = getValues('product_attributes');
	const attributeStockQtySum = sumAttributeStockQuantity(productAttributes);
	const attributeStockQuantityChanged = prevAttributeStockQuentity !== attributeStockQtySum;

	useEffect(() => {
		setPrevAttributeStockQuantity(attributeStockQtySum);
		setValue('stock.initial_quantity', attributeStockQtySum);
		form.setFieldValue('stock.initial_quantity', attributeStockQtySum);
	}, [attributeStockQuantityChanged, attributeStockQtySum, form, setValue]);

	return (
		<>
			<Typography.Title level={2}>Lager</Typography.Title>
			<Row gutter={[12, 0]}>
				<Col sm={24} md={12}>
					<FormItem control={control} name='stock.sku' label='Lagerplats'>
						<Input />
					</FormItem>
				</Col>
			</Row>
			<Row gutter={[12, 0]}>
				<Col sm={24} md={12}>
					<FormItem control={control} name='stock.initial_quantity' label='Initialt lagersaldo'>
						<InputNumber readOnly={attributeStockQtySum > 0} decimalSeparator=',' />
					</FormItem>
				</Col>
			</Row>
			<Row gutter={[12, 0]}>
				<Col sm={24} md={12} lg={6}>
					<FormItem control={control} name='stock.available_at' label='Tillgänglig från'>
						<DatePicker />
					</FormItem>
				</Col>
				<Col sm={24} md={12} lg={6}>
					<FormItem
						control={control}
						name='stock.allow_order_out_of_stock'
						label='Tillåt beställning vid slutsåld'
						valuePropName='checked'>
						<Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
					</FormItem>
				</Col>
			</Row>
			<Row gutter={[12, 0]}>
				<Col sm={24} md={12}>
					<FormItem control={control} name='stock.out_of_stock_message' label='Meddelande vid slutsåld'>
						<Input />
					</FormItem>
				</Col>
			</Row>
			<Row gutter={[12, 0]}>
				<Col sm={24} md={12}>
					<FormItem
						control={control}
						name='stock.send_email_out_of_stock'
						label='Skicka e-post vid slutsåld'
						tooltip='Få ett e-postmeddelande när produkten blir slutsåld'
						valuePropName='checked'>
						<Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
					</FormItem>
				</Col>
			</Row>
			<Row gutter={[12, 0]}>
				<Col sm={24} md={12}>
					<FormItem
						control={control}
						name='stock.min_order_quantity'
						label='Minsta beställningsantal'
						tooltip='Ange det minsta antal som går att beställa av denna produkt.'>
						<InputNumber readOnly={attributeStockQtySum > 0} decimalSeparator=',' />
					</FormItem>
				</Col>
			</Row>
			<Row gutter={[12, 0]}>
				<Col sm={24} md={12}>
					<FormItem control={control} name='stock.in_stock_message' label='Meddelande vid i lager'>
						<Input />
					</FormItem>
				</Col>
			</Row>
		</>
	);
};

function sumAttributeStockQuantity(productAttributes: ProductSchemaType['product_attributes']) {
	let sum = 0;

	productAttributes.forEach((productAttribute) => {
		sum += productAttribute.stock.initial_quantity;
	});

	return sum;
}
