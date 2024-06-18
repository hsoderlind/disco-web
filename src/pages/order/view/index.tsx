import { useParams } from 'react-router-dom';
import { ErrorBoundary } from '../../../components/error-boundary';
import { RouteParams } from '../../../types/common';
import { useGetOrder } from '../../../services/order/hooks/useGetOrder';
import { ContentLayout } from '../../../components/layout/content-layout/ContentLayout';
import { MainContentLayout } from '../../../components/layout/content-layout/MainContentLayout';
import { OrderItemsTable } from '../components/order-items-table';
import { OrderStatusHistoryType, OrderType } from '../../../services/order/types';
import { Button, Card, Col, Descriptions, List, Row, Timeline, Typography } from 'antd';
import { Currency } from '../../../lib/number/Currency';
import { EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Link from '../../../components/navigation/Link';
import { ActivitySchema } from '../../../services/activity/types';

export { ErrorBoundary };

export function Component() {
	const params = useParams<RouteParams>();
	const { data: order } = useGetOrder(+params.id!);

	return (
		<ContentLayout>
			<MainContentLayout title={`Beställning ${order?.get('order_number')}`}>
				<Descriptions
					className='mb-input'
					items={[
						{
							key: 'order_number',
							label: 'Ordernummer',
							children: order?.get<OrderType['order_number']>('order_number')
						},
						{
							key: 'order_date',
							label: 'Orderdatum',
							children: dayjs(order?.get<OrderType['created_at']>('created_at')).format('L LT')
						},
						{
							key: 'status',
							label: 'Status',
							children: order?.get<OrderType['current_status']>('current_status').new_status.name
						},
						{
							key: 'customer',
							label: 'Kund',
							children: (
								<Link to={`../../customers/view/${order?.get<OrderType['customer']>('customer').id}`}>
									{order?.get<OrderType['customer']>('customer').name}
								</Link>
							)
						},
						{
							key: 'payment',
							label: 'Betalsätt',
							children: order?.get<OrderType['payment']>('payment').title
						},
						{
							key: 'shipping',
							label: 'Leveranssätt',
							children: order?.get<OrderType['shipping']>('shipping').title
						}
					]}
				/>
				<Card
					title='Orderrader'
					className='mb-input'
					extra={
						<Button type='link' icon={<EditOutlined />}>
							redigera
						</Button>
					}>
					<OrderItemsTable
						items={order?.get<OrderType['items']>('items')}
						minRows={order?.get<OrderType['items']>('items', []).length}
						readonly
					/>
					<Row justify='end'>
						<Col xs={24} sm={12} md={8} lg={6}>
							<List
								dataSource={order?.get<OrderType['totals']>('totals')}
								renderItem={(total) => (
									<List.Item actions={[Currency.format(total.value)]}>
										<List.Item.Meta title={total.label} />
									</List.Item>
								)}
							/>
						</Col>
					</Row>
				</Card>
				<Card title='Betalning' className='mb-input'></Card>
				<Card title='Leverans' className='mb-input'>
					<Descriptions
						items={[
							{
								key: 'shipping_method',
								label: 'Leveranssätt',
								children: order?.get<OrderType['shipping']>('shipping').title
							}
						]}
					/>
				</Card>
				<Card
					title='Orderstatus historik'
					className='mb-input'
					extra={
						<Button type='link' icon={<EditOutlined />}>
							ändra orderstatus
						</Button>
					}>
					<List
						dataSource={order?.statusHistory().getItems()}
						renderItem={(status) => (
							<List.Item actions={[status.get<OrderStatusHistoryType['created_at']>('created_at').format('L LT')]}>
								<List.Item.Meta
									title={status.get<OrderStatusHistoryType['new_status']>('new_status').name}
									description={
										<div className='white-space-pre-line'>
											{status.get<OrderStatusHistoryType['note']>('note')?.title ? (
												<>
													{status.get<OrderStatusHistoryType['note']>('note')?.title}
													<br />
												</>
											) : null}
											{status.get<OrderStatusHistoryType['note']>('note')?.content}
										</div>
									}
								/>
							</List.Item>
						)}
					/>
				</Card>
				<Card
					title='Anteckningar'
					className='mb-input'
					extra={
						<Button type='link' icon={<EditOutlined />}>
							ny anteckning
						</Button>
					}>
					<List
						dataSource={order?.get<OrderType['notes']>('notes')}
						renderItem={(note) => (
							<List.Item>
								<List.Item.Meta
									title={note.title}
									description={<div className='white-space-pre-line'>{note.content}</div>}
								/>
							</List.Item>
						)}
					/>
				</Card>
				<Card
					title='Metadata'
					className='mb-input'
					extra={
						<Button type='link' icon={<EditOutlined />}>
							ny metadata
						</Button>
					}>
					<List
						dataSource={order?.get<OrderType['metadata']>('metadata')}
						renderItem={(metadata) => (
							<List.Item actions={[metadata.value]}>
								<List.Item.Meta title={metadata.key} />
							</List.Item>
						)}
					/>
				</Card>
				<Card title='Aktivitetslogg' className='mb-input'>
					<Timeline mode='left' reverse>
						{order?.activities().map((activity) => (
							<Timeline.Item
								label={activity.get<ActivitySchema['created_at']>('created_at').format('L LT')}
								children={
									<div>
										<Typography.Text>{activity.get<string>('description')}</Typography.Text>
										<br />
										<Typography.Text type='secondary'>
											Utförd av: {activity.get<ActivitySchema['causer']>('causer').name}
										</Typography.Text>
									</div>
								}
							/>
						))}
					</Timeline>
				</Card>
			</MainContentLayout>
		</ContentLayout>
	);
}
