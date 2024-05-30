import { Alert, Button, Col, List, Row, Tag, Tooltip } from 'antd';
import { ErrorBoundary } from '../../components/error-boundary';
import { ContentLayout } from '../../components/layout/content-layout/ContentLayout';
import { MainContentLayout } from '../../components/layout/content-layout/MainContentLayout';
import { Sidebar } from './components/sidebar';
import { useListPaymentMethods } from '../../services/payment-method/hooks/useListPaymentMethods';
import { EditOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import { PaymentMethod } from '../../services/payment-method/PaymentMethod';
import { useNavigate } from '../../hooks/useNavigate';

export { ErrorBoundary };

export function Component() {
	const navigate = useNavigate();
	const { data: paymentMethods, isFetching, isLoading } = useListPaymentMethods(true);

	const handleSelectMethod = (model: PaymentMethod) => () => {
		navigate(`./${model.getKey()}`, model.get('title'));
	};

	return (
		<ContentLayout>
			<Sidebar selectedItems={['payment-methods']} />
			<MainContentLayout title='Betalningssätt'>
				<Row gutter={[16, 0]}>
					<Col sm={24} md={12}>
						{!isFetching && !isLoading && (!paymentMethods || paymentMethods.size === 0) && (
							<Alert
								type='warning'
								message='Inga installerade betalningssätt'
								description='Det verkar inte finnas några betalningssätt installerade i butiken. Klicka på `Moduler` i menyn till höger för att välja betalningssätt att installera.'
							/>
						)}
						<List
							bordered
							loading={isFetching || isLoading}
							itemLayout='horizontal'
							dataSource={paymentMethods?.getItems()}
							rowKey={(model) => model.get<string>('name')}
							renderItem={(model) => (
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
