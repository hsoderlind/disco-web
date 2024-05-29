import { Button, Card, Col, Descriptions, List, Row, Tag, Tooltip, Typography } from 'antd';
import { ErrorBoundary } from '../../../components/error-boundary';
import { ContentLayout } from '../../../components/layout/content-layout/ContentLayout';
import { MainContentLayout } from '../../../components/layout/content-layout/MainContentLayout';
import { useLoadModules } from '../../../services/payment-method/hooks/useLoadModules';
import { Sidebar } from '../components/sidebar';
import { RiInstallLine } from 'react-icons/ri';
import { RiUninstallLine } from 'react-icons/ri';
import { RiInformationLine } from 'react-icons/ri';
import { useSearchParams } from 'react-router-dom';
import { PaymentMethodModule } from '../../../services/payment-method/PaymentMethodModule';
import { useMemo } from 'react';
import { useInstallPaymentMethod } from '../../../services/payment-method/hooks/useInstallPaymentMethod';
import app from '../../../lib/application-builder/ApplicationBuilder';

export { ErrorBoundary };

export function Component() {
	const { data: modules, isFetching, isLoading, refetch } = useLoadModules();
	const [searchParams, setSearchParams] = useSearchParams();
	const selectedModuleId = searchParams.has('module') ? searchParams.get('module') : undefined;
	const mutation = useInstallPaymentMethod({
		onSuccess: () => {
			app.addSuccessNotification({ description: 'Betalningssättet installerades.' });
			refetch();
		},
		onError: (error) => {
			app.addErrorNotification({ description: error.message });
		}
	});

	const selectedModule = useMemo(
		() => !!selectedModuleId && modules?.find(selectedModuleId),
		[selectedModuleId, modules]
	);

	const handleMoreInfoClick = (model: PaymentMethodModule) => () => {
		searchParams.set('module', model.getKey());
		setSearchParams(searchParams);
	};

	const installModule = (model: PaymentMethodModule) => () => mutation.mutateAsync(model.toJSON());

	return (
		<ContentLayout>
			<Sidebar selectedItems={['modules']} />
			<MainContentLayout title='Betalningsmoduler'>
				<Row gutter={[16, 0]}>
					<Col sm={24} md={12}>
						<List
							bordered
							loading={isFetching || isLoading}
							itemLayout='horizontal'
							dataSource={modules?.getItems()}
							rowKey={(model) => model.get<string>('name')}
							renderItem={(model) => {
								return (
									<List.Item
										actions={[
											model.get<boolean>('installed') ? (
												<Tooltip title='Installera'>
													<Button type='link' icon={<RiInstallLine style={{ fontSize: '1.25rem' }} />} />
												</Tooltip>
											) : (
												<Tooltip title='Installera'>
													<Button
														type='link'
														icon={<RiUninstallLine style={{ fontSize: '1.25rem' }} />}
														onClick={installModule(model)}
													/>
												</Tooltip>
											),
											<Tooltip title='Mer information'>
												<Button
													type='link'
													icon={<RiInformationLine style={{ fontSize: '1.25rem' }} />}
													onClick={handleMoreInfoClick(model)}
												/>
											</Tooltip>
										]}>
										<div className='flex flex-column flex-1 row-gap-4'>
											<List.Item.Meta
												avatar={<img src='https://place-hold.it/200x150' style={{ maxWidth: '100px' }} />}
												title={
													<>
														<Typography.Title level={5} style={{ display: 'inline-block' }}>
															{model.get<string>('title')}{' '}
														</Typography.Title>
														<Typography.Text type='secondary' italic>
															(Vers: {model.get<string>('version')})
														</Typography.Text>
													</>
												}
												description={
													<Typography.Text>
														<div className='line-clamp-2'>{model.get<string>('description')}</div>
													</Typography.Text>
												}
											/>
											<div className='flex flex-row justify-end '>
												{model.get('installed') && (
													<div>
														<Tag color='green' bordered={false}>
															Installerad
														</Tag>
													</div>
												)}
											</div>
										</div>
									</List.Item>
								);
							}}
						/>
					</Col>
					{selectedModule && (
						<Col xs={24} md={12}>
							<Card
								title={selectedModule.get<string>('title')}
								extra={
									selectedModule.get<boolean>('installed') ? (
										<Tooltip title='Installera'>
											<Button type='link' icon={<RiInstallLine style={{ fontSize: '1.25rem' }} />} />
										</Tooltip>
									) : (
										<Tooltip title='Installera'>
											<Button
												type='link'
												icon={<RiUninstallLine style={{ fontSize: '1.25rem' }} />}
												onClick={installModule(selectedModule)}
											/>
										</Tooltip>
									)
								}>
								<Card.Meta description={selectedModule.get<string>('description')} />
								<Descriptions
									className='mt-5'
									column={1}
									items={[
										{
											key: 'version',
											label: 'Version',
											children: selectedModule.get<string>('version')
										},
										{
											key: 'published_at',
											label: 'Publicerades',
											children: selectedModule.get<string>('published_at')
										},
										{
											key: 'updated_at',
											label: 'Uppdaterades senast',
											children: selectedModule.get<string>('updated_at') ?? '-'
										}
									]}
								/>
							</Card>
						</Col>
					)}
				</Row>
			</MainContentLayout>
		</ContentLayout>
	);
}
