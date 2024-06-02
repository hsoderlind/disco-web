import { Button, Col, List, Row, Tooltip } from 'antd';
import { ContentLayout } from '../../../components/layout/content-layout/ContentLayout';
import { MainContentLayout } from '../../../components/layout/content-layout/MainContentLayout';
import { SidebarContentLayout } from '../../../components/layout/content-layout/SidebarContentLayout';
import { useListOrderStatuses } from '../../../services/order-status/hooks/useListOrderStatuses';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { OrderStatus } from '../../../services/order-status/OrderStatus';
import { useNavigate } from '../../../hooks/useNavigate';
import { ErrorBoundary } from '../../../components/error-boundary';
import { ButtonBar } from '../../../components/forms/buttonbar';
import { Outlet } from 'react-router-dom';

export { ErrorBoundary };

export function Component() {
	const navigate = useNavigate();
	const { data: orderStatuses, isFetching, isLoading } = useListOrderStatuses();

	const handleClick = (model: OrderStatus) => () => navigate(`./${model.getKey()}`, model.get('name'));

	const newOrderStatus = () => navigate('./new', 'Lägg till orderstatus');

	return (
		<ContentLayout>
			<SidebarContentLayout>
				<div />
			</SidebarContentLayout>
			<MainContentLayout
				renderButtonBar={
					<ButtonBar>
						<Button type='primary' icon={<PlusOutlined />} onClick={newOrderStatus}>
							Lägg till orderstatus
						</Button>
					</ButtonBar>
				}>
				<Row gutter={16}>
					<Col xs={24} md={12}>
						<List
							bordered
							itemLayout='horizontal'
							loading={isFetching || isLoading}
							dataSource={orderStatuses?.getItems()}
							renderItem={(model) => (
								<List.Item
									actions={[
										<Tooltip title='Redigera'>
											<Button type='link' icon={<EditOutlined />} onClick={handleClick(model)} />
										</Tooltip>
									]}>
									<List.Item.Meta title={model.get<string>('name')} />
								</List.Item>
							)}
						/>
					</Col>
					<Col xs={24} md={12}>
						<Outlet />
					</Col>
				</Row>
			</MainContentLayout>
		</ContentLayout>
	);
}
