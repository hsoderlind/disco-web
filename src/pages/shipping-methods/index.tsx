import { Alert, Button, Col, List, Row, Tag, Tooltip } from 'antd';
import { ErrorBoundary } from '../../components/error-boundary';
import { ContentLayout } from '../../components/layout/content-layout/ContentLayout';
import { MainContentLayout } from '../../components/layout/content-layout/MainContentLayout';
import { useNavigate } from '../../hooks/useNavigate';
import { useListShippingMethods } from '../../services/shipping-method/hooks/useListShippingMethods';
import { Sidebar } from './components/sidebar';
import { EditOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';

export { ErrorBoundary };

export function Component() {
	const navigate = useNavigate();
	const { data: shippingMethods, isFetching, isLoading } = useListShippingMethods();

	const handleSelectMethod = (model: any) => () => {
		navigate(`./${model.getKey()}`, model.get('title'));
	};

	return (
		<ContentLayout>
			<Sidebar selectedItems={['shipping-methods']} />
			<MainContentLayout title='Leveranssätt'>
				<Row gutter={[16, 0]}>
					<Col xs={24} md={12}>
						{!isFetching && !isLoading && (!shippingMethods || shippingMethods.size === 0) && (
							<Alert
								type='warning'
								message='Inga installerade leveranssätt'
								description='Det verkar inte finnas några leveranssätt installerade i butiken. Klicka på `Moduler` i menyn till höger för att välja moduler att installera.'
							/>
						)}
						<List
							bordered
							loading={isFetching || isLoading}
							itemLayout='horizontal'
							dataSource={shippingMethods?.getItems()}
							rowKey={(model) => model.get<string>('name')}
							renderItem={(model) => {
								return (
									<List.Item
										actions={[
											<Tooltip title='Redigera'>
												<Button type='link' icon={<EditOutlined />} onClick={handleSelectMethod(model)} />
											</Tooltip>
										]}>
										<List.Item.Meta title={model.get<string>('title')} description={model.get<string>('description')} />
										{model.get('active') ? <Tag color='green'>Aktiv</Tag> : <Tag color='volcano'>Inaktiv</Tag>}
									</List.Item>
								);
							}}
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
