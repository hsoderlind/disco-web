import { Button, Card, Descriptions, Tag, Tooltip, Typography } from 'antd';
import { CardList } from '../../../components/card-list';
import { ErrorBoundary } from '../../../components/error-boundary';
import { ContentLayout } from '../../../components/layout/content-layout/ContentLayout';
import { MainContentLayout } from '../../../components/layout/content-layout/MainContentLayout';
import { useListShippingModules } from '../../../services/shipping-method/hooks/useListShippingModules';
import { RxUpdate } from 'react-icons/rx';
import { RiInstallLine, RiUninstallLine } from 'react-icons/ri';
import { Sidebar } from '../components/sidebar';
import { useInstallShippingModule } from '../../../services/shipping-method/hooks/useInstallShippingModule';
import app from '../../../lib/application-builder/ApplicationBuilder';
import { useUpdateShippingModule } from '../../../services/shipping-method/hooks/useUpdateShippingModule';
import { useUninstallShippingModule } from '../../../services/shipping-method/hooks/useUninstallShippingModule';
import { ShippingModule } from '../../../services/shipping-method/ShippingModule';

export { ErrorBoundary };

export function Component() {
	const { data: modules, isFetching, isLoading, refetch } = useListShippingModules();
	const installMutation = useInstallShippingModule({
		onSuccess: (module) => {
			app.addSuccessNotification({ description: `Modulen "${module.get('title')}" har nu installerats.` });
		}
	});
	const updateMutation = useUpdateShippingModule({
		onSuccess: (module) => {
			app.addSuccessNotification({ description: `Modulen "${module.get('title')}" har nu uppdaterats.` });
		}
	});
	const uninstallMutation = useUninstallShippingModule({
		onSuccess: () => app.addSuccessNotification({ description: 'Modulen har nu avinstallerats.' })
	});

	const installModule = (module: ShippingModule) => async () => {
		await installMutation.mutateAsync(module.get('name'));
		refetch();
	};

	const updateModule = (module: ShippingModule) => async () => {
		updateMutation.mutateAsync(module.get('name'));
		refetch();
	};

	const uninstallModule = (module: ShippingModule) => async () => {
		await uninstallMutation.mutateAsync(module.get('name'));
		refetch();
	};

	return (
		<ContentLayout>
			<Sidebar selectedItems={['modules']} />
			<MainContentLayout title='Leverans-moduler'>
				<CardList
					loading={isFetching || isLoading}
					rowProps={{ gutter: 16 }}
					dataSource={modules?.getItems()}
					renderItem={(model) => {
						console.log('is installed', model.get('installed'));
						return (
							<Card
								title={model.get<string>('title')}
								extra={<Typography.Text type='secondary'>Vers: {model.get<string>('version')}</Typography.Text>}
								cover={<img src='https://place-hold.it/200x150' />}
								actions={[
									model.get('installed') && model.get('update_available') ? (
										<Tooltip title='Uppdatera'>
											<Button
												type='link'
												icon={<RxUpdate style={{ fontSize: '1.25rem', color: 'var(--ant-magenta-7)' }} />}
												onClick={updateModule(model)}
												loading={updateMutation.isLoading}
											/>
										</Tooltip>
									) : null,
									model.get('installed') ? (
										<Tooltip title='Avinstallera'>
											<Button
												type='link'
												icon={<RiUninstallLine style={{ fontSize: '1.25rem' }} />}
												onClick={uninstallModule(model)}
												loading={uninstallMutation.isLoading}
											/>
										</Tooltip>
									) : (
										<Tooltip title='Installera'>
											<Button
												type='link'
												icon={<RiInstallLine style={{ fontSize: '1.25rem' }} />}
												onClick={installModule(model)}
												loading={installMutation.isLoading}
											/>
										</Tooltip>
									)
								]}>
								<Card.Meta
									style={{ minHeight: '44px' }}
									description={<Typography.Text>{model.get<string>('description')}</Typography.Text>}
								/>
								<Descriptions
									className='mt-5'
									layout='vertical'
									column={2}
									items={[
										{
											key: 'published_at',
											label: 'Publicerades',
											children: model.get<string>('published_at')
										},
										{
											key: 'updated_at',
											label: 'Uppdaterades senast',
											children: model.get<string>('updated_at') ?? '-'
										}
									]}
								/>
								<div className='mt-4'>
									{model.get('installed') && (
										<Tag color='green' bordered={false}>
											Installerad
										</Tag>
									)}
									{model.get('installed') && !!model.get('update_available') && (
										<Tag color='magenta' bordered={false}>
											Uppdatering tillgänglig
										</Tag>
									)}
								</div>
							</Card>
						);
					}}
				/>
			</MainContentLayout>
		</ContentLayout>
	);
}
