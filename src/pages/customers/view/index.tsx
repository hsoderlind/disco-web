import { loadCustomer as loader } from '../../../services/customer/loaders';
import { ErrorBoundary } from '../../../components/error-boundary';
import { ContentLayout } from '../../../components/layout/content-layout/ContentLayout';
import { MainContentLayout } from '../../../components/layout/content-layout/MainContentLayout';

export { loader, ErrorBoundary };

export function Component() {
	return (
		<ContentLayout>
			<MainContentLayout>
				<div />
			</MainContentLayout>
		</ContentLayout>
	);
}
