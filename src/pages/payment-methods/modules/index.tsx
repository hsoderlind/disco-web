import { Button, Card, Descriptions, Tag, Tooltip, Typography } from 'antd';
import { ErrorBoundary } from '../../../components/error-boundary';
import { ContentLayout } from '../../../components/layout/content-layout/ContentLayout';
import { MainContentLayout } from '../../../components/layout/content-layout/MainContentLayout';
import { useLoadModules } from '../../../services/payment-method/hooks/useLoadModules';
import { Sidebar } from '../components/sidebar';
import { RiInstallLine } from 'react-icons/ri';
import { RiUninstallLine } from 'react-icons/ri';
import { PaymentMethodModule } from '../../../services/payment-method/PaymentMethodModule';
import { useInstallPaymentMethod } from '../../../services/payment-method/hooks/useInstallPaymentMethod';
import app from '../../../lib/application-builder/ApplicationBuilder';
import { useUninstallPaymentMethod } from '../../../services/payment-method/hooks/useUninstallPaymentMethod';
import { PaymentMethodType } from '../../../services/payment-method/types';
import { PaymentMethod } from '../../../services/payment-method/PaymentMethod';
import { RxUpdate } from 'react-icons/rx';
import { CardList } from '../../../components/card-list';
import { useUpdateCore } from '../../../services/payment-method/hooks/useUpdateCore';

export { ErrorBoundary };

export function Component() {
	const { data: modules, isFetching, isLoading, refetch } = useLoadModules();
	const installMutation = useInstallPaymentMethod({
		onSuccess: () => {
			app.addSuccessNotification({ description: 'Betalningsmodulen har nu installerats.' });
			refetch();
		},
		onError: (error) => app.addErrorNotification({ description: error.message })
	});
	const uninstallMutation = useUninstallPaymentMethod({
		onSuccess: () => {
			app.addSuccessNotification({ description: 'Betalningsmodulen har nu avinstallerats.' });
			refetch();
		},
		onError: (error) => app.addErrorNotification({ description: error.message })
	});
	const updateMutation = useUpdateCore({
		onSuccess: () => {
			app.addSuccessNotification({ description: 'Betalningsmodulen har nu uppdaterats' });
			refetch();
		},
		onError: (error) => {
			app.addErrorNotification({ description: error.message });
		}
	});

	const installModule = (model: PaymentMethodModule) => () => installMutation.mutateAsync(model.toJSON());

	const uninstallModule = (model: PaymentMethodModule) => () => {
		const paymentMethodData: Partial<PaymentMethodType> = {
			name: model.get('name')
		};

		const paymentMethod = new PaymentMethod(paymentMethodData, model.shopId);

		return uninstallMutation.mutateAsync(paymentMethod);
	};

	const updateModule = (model: PaymentMethodModule) => () => updateMutation.mutateAsync(model.getKey());

	return (
		<ContentLayout>
			<Sidebar selectedItems={['modules']} />
			<MainContentLayout title='Betalningsmoduler'>
				<CardList
					loading={isFetching || isLoading}
					rowProps={{ gutter: 16 }}
					column={3}
					dataSource={modules?.getItems()}
					renderItem={(model) => (
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
											icon={<RiInstallLine style={{ fontSize: '1.25rem' }} />}
											onClick={uninstallModule(model)}
											loading={uninstallMutation.isLoading}
										/>
									</Tooltip>
								) : (
									<Tooltip title='Installera'>
										<Button
											type='link'
											icon={<RiUninstallLine style={{ fontSize: '1.25rem' }} />}
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
					)}
				/>
			</MainContentLayout>
		</ContentLayout>
	);
}
