import { Alert, Button, Col, List, Row, Tag, Tooltip } from 'antd';
import { ErrorBoundary } from '../../../components/error-boundary';
import { ContentLayout } from '../../../components/layout/content-layout/ContentLayout';
import { MainContentLayout } from '../../../components/layout/content-layout/MainContentLayout';
import { useListOrderTotals } from '../../../services/order/hooks/useListOrderTotals';
import { Sidebar } from './components/sidebar';
import { useNavigate } from '../../../hooks/useNavigate';
import { OrderTotalRepository } from '../../../services/order/OrderTotalRepository';
import { EditOutlined } from '@ant-design/icons';

export { ErrorBoundary };

export function Component() {
	const navigate = useNavigate();
	const { data: orderTotals, isFetching, isLoading } = useListOrderTotals();

	const handleSelectMethod = (model: OrderTotalRepository) => () => {
		navigate(`./${model.getKey()}`, model.get('title'));
	};

	return (
		<ContentLayout>
			<Sidebar selectedItems={['order-totals']} />
			<MainContentLayout>
				<Row gutter={[16, 0]}>
					<Col xs={24} md={12}>
						{!isFetching && !isLoading && (!orderTotals || orderTotals.size === 0) && (
							<Alert
								type='warning'
								message='Inga installerade Order total-moduler'
								description='Det verkar inte finnas några Order total-moduler installerade i butiken. Klicka på `Moduler` i menyn till höger för att välja moduler att installera.'
							/>
						)}
						<List
							bordered
							loading={isFetching || isLoading}
							itemLayout='horizontal'
							dataSource={orderTotals?.getItems()}
							rowKey={(model) => model.get<string>('name')}
							renderItem={(model) => {
								return (
									<List.Item
										actions={[
											<Tooltip title='Redigera'>
												<Button type='link' icon={<EditOutlined />} onClick={handleSelectMethod(model)} />
											</Tooltip>
										]}>
										<List.Item.Meta
											title={model.get<string>('title')}
											description={<div className='line-clamp-2'>{model.get<string>('description')}</div>}
										/>
										{model.get('active') ? <Tag color='green'>Aktiv</Tag> : <Tag color='volcano'>Inaktiv</Tag>}
									</List.Item>
								);
							}}
						/>
					</Col>
				</Row>
			</MainContentLayout>
		</ContentLayout>
	);
}
