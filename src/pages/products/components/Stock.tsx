import { useFormContext } from 'react-hook-form';
import { ProductSchemaType } from '../../../services/product/types';
import { Col, DatePicker, Input, Row, Switch, Typography } from 'antd';
import FormItem from '../../../lib/form/FormItem';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { InputNumber } from '../../../components/forms/controls/input-number';

export const Stock = () => {
	const { control } = useFormContext<ProductSchemaType>();

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
						<InputNumber />
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
						<InputNumber />
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
