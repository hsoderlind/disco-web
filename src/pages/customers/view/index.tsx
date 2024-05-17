import { loadCustomer as loader } from '../../../services/customer/loaders';
import { ErrorBoundary } from '../../../components/error-boundary';
import { ContentLayout } from '../../../components/layout/content-layout/ContentLayout';
import { useSearchParams } from 'react-router-dom';
import { Sidebar } from './components/sidebar';
import { Details } from './components/details';
import { Addresses } from './components/addresses';
import { CreditBalance } from './components/credit-balance';
import { Notes } from './components/credit-balance/notes';

export { loader, ErrorBoundary };

export function Component() {
	const [searchParams] = useSearchParams({ section: 'details' });
	const section = searchParams.get('section');

	return (
		<ContentLayout>
			<Sidebar />
			{section === 'details' && <Details />}
			{section === 'addresses' && <Addresses />}
			{section === 'credit-balance' && <CreditBalance />}
			{section === 'notes' && <Notes />}
		</ContentLayout>
	);
}
