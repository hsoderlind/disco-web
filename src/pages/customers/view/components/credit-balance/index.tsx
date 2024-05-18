import { Button, Card, Typography } from 'antd';
import { MainContentLayout } from '../../../../../components/layout/content-layout/MainContentLayout';
import { useLoaderData } from '../../../../../hooks/useLoaderData';
import { Customer } from '../../../../../services/customer/Customer';
import { useFindCreditBalance } from '../../../../../services/customer/hooks/useFindCreditBalance';
import { Currency } from '../../../../../lib/number/Currency';
import { CreditBalanceForm } from './form';
import { useState } from 'react';
import { ButtonBar } from '../../../../../components/forms/buttonbar';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from '../../../../../hooks/useNavigate';
import { CreditBalanceHistory } from './history';

export const CreditBalance = () => {
	const navigate = useNavigate();
	const [showForm, setShowForm] = useState(false);
	const customer = useLoaderData<Customer>();
	const { data: creditBalance, refetch } = useFindCreditBalance(customer.getKey()!);

	const goToCustomers = () => {
		navigate('../', 'Kunder');
	};

	return (
		<MainContentLayout
			renderButtonBar={
				<ButtonBar>
					<Button type='default' icon={<ArrowLeftOutlined />} onClick={goToCustomers} size='large'>
						Kunder
					</Button>
				</ButtonBar>
			}>
			<Typography.Title level={2}>Kreditsaldo</Typography.Title>
			<Card
				title='Nuvarande saldo'
				extra={
					<Button type='link' onClick={() => setShowForm(true)} disabled={showForm}>
						Justera saldo
					</Button>
				}>
				{Currency.format(creditBalance?.get<number>('current_balance') ?? 0)}
			</Card>
			{showForm && (
				<CreditBalanceForm
					onCancel={() => setShowForm(false)}
					onAfterAdjustment={() => {
						refetch();
						setShowForm(false);
					}}
				/>
			)}
			<div className='py-5'>
				<Typography.Title level={3}>Historik</Typography.Title>
				<CreditBalanceHistory />
			</div>
		</MainContentLayout>
	);
};
