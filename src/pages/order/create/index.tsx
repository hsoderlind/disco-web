import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';
import { ErrorBoundary } from '../../../components/error-boundary';
import { ButtonBar } from '../../../components/forms/buttonbar';
import { ContentLayout } from '../../../components/layout/content-layout/ContentLayout';
import { MainContentLayout } from '../../../components/layout/content-layout/MainContentLayout';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { ProductSelect } from '../../../components/forms/controls/product-select';
import { useOrderForm } from '../../../services/order/hooks/useOrderForm';
import { FormProvider, useFieldArray } from 'react-hook-form';
import { OrderItemsTable } from '../components/order-items-table';
import { CustomerCard } from '../components/customer-card';
import { FormItem } from 'react-hook-form-antd';
import { PaymentsMethodsCard } from '../components/payment-methods-card';
import { OrderTotalsCard } from '../components/order-totals-card';
import { ShippingMethodsCard } from '../components/shipping-methods-card';

export { ErrorBoundary };

export function Component() {
	const [methods, onSubmit] = useOrderForm();
	const {
		formState: { isDirty, isSubmitting, errors }
	} = methods;
	const {
		fields: orderItems,
		append: appendOrderItem,
		remove: removeOrderItem,
		update: updateOrderItem
	} = useFieldArray({ control: methods.control, name: 'items', keyName: 'key' });

	return (
		<FormProvider {...methods}>
			<ContentLayout>
				<MainContentLayout
					title='Ny beställning'
					renderButtonBar={
						<ButtonBar buttonsPlacement='space-between'>
							<Button size='large' icon={<ArrowLeftOutlined />}>
								Beställningar
							</Button>
							<Button
								size='large'
								type='primary'
								icon={<SaveOutlined />}
								disabled={!isDirty}
								loading={isSubmitting}
								onClick={methods.handleSubmit(onSubmit)}>
								Slutför beställningen
							</Button>
						</ButtonBar>
					}>
					<Form layout='vertical'>
						<Card className='mb-input' style={{ borderColor: errors.items ? 'var(--ant-color-error)' : undefined }}>
							<Row gutter={24}>
								<Col span={12}>
									<Form.Item>
										<ProductSelect
											placeholder='Välj eller sök efter produkt'
											state='published'
											category={0}
											includeSubcategories
											onChange={(product) =>
												appendOrderItem({
													product_id: product.getKey(),
													product_name: product.get('name'),
													price: product.get('selling_price'),
													quantity: 1,
													tax_id: product.get('tax_id'),
													tax_value: product.tax().get('value'),
													total: product.get<number>('selling_price') * 1,
													vat: product.get<number>('selling_price') * (product.tax().get<number>('value') / 100),
													itemAttributes: []
												})
											}
										/>
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={24}>
								<Col span={24}>
									<OrderItemsTable items={orderItems} update={updateOrderItem} remove={removeOrderItem} />
								</Col>
							</Row>
							{errors.items && <Typography.Text type='danger'>{errors.items.message}</Typography.Text>}
						</Card>
						<Row gutter={24}>
							<Col span={12}>
								<CustomerCard
									className='mb-input'
									style={{ borderColor: errors.customer_id ? 'var(--ant-color-error)' : undefined }}
								/>
								<Card title='Kommentar' style={{ borderColor: errors.note ? 'var(--ant-color-error)' : undefined }}>
									<FormItem control={methods.control} name='note'>
										<Input.TextArea rows={3} />
									</FormItem>
								</Card>
							</Col>
							<Col span={12}>
								<PaymentsMethodsCard
									className='mb-input'
									style={{ borderColor: errors.payment_name ? 'var(--ant-color-error)' : undefined }}
								/>
								<ShippingMethodsCard
									className='mb-input'
									style={{ borderColor: errors.shipping_name ? 'var(--ant-color-error)' : undefined }}
								/>
								<OrderTotalsCard style={{ borderColor: errors.totals ? 'var(--ant-color-error)' : undefined }} />
							</Col>
						</Row>
					</Form>
				</MainContentLayout>
			</ContentLayout>
		</FormProvider>
	);
}
