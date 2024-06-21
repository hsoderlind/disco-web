import { loadCustomer as loader } from '../../../services/customer/loaders';
import { ErrorBoundary } from '../../../components/error-boundary';
import { ContentLayout } from '../../../components/layout/content-layout/ContentLayout';
import { useSearchParams } from 'react-router-dom';
import { Sidebar } from './components/sidebar';
import { Details } from './components/details';
import { Addresses } from './components/addresses';
import { CreditBalance } from './components/credit-balance';
import { Notes } from '../../../components/notes';
import { Metadata } from '../../../components/metadata';
import { useLoaderData } from '../../../hooks/useLoaderData';
import { Customer } from '../../../services/customer/Customer';
import { ButtonBar } from '../../../components/forms/buttonbar';
import { Button } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from '../../../hooks/useNavigate';

export { loader, ErrorBoundary };

export function Component() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams({ section: 'details' });
	const section = searchParams.get('section');
	const customer = useLoaderData<Customer>();

	const goToCustomers = () => navigate('../', 'Kunder');

	return (
		<ContentLayout>
			<Sidebar />
			{section === 'details' && <Details />}
			{section === 'addresses' && <Addresses />}
			{section === 'credit-balance' && <CreditBalance />}
			{section === 'notes' && (
				<Notes
					resource='customer'
					resourceId={customer.getKey()!}
					renderButtonBar={(params) => (
						<>
							<ButtonBar>
								<Button type='default' icon={<ArrowLeftOutlined />} onClick={goToCustomers} size='large'>
									Kunder
								</Button>
								<Button type='primary' size='large' icon={<PlusOutlined />} onClick={params.openModal}>
									Ny anteckning
								</Button>
							</ButtonBar>
						</>
					)}
				/>
			)}
			{section === 'metadata' && (
				<Metadata
					resource='customer'
					resourceId={customer.getKey()!}
					renderButtonBar={(params) => (
						<ButtonBar>
							<Button type='default' icon={<ArrowLeftOutlined />} onClick={goToCustomers} size='large'>
								Kunder
							</Button>
							<Button type='primary' size='large' icon={<PlusOutlined />} onClick={params.openModal}>
								Ny metadata
							</Button>
						</ButtonBar>
					)}
				/>
			)}
		</ContentLayout>
	);
}
