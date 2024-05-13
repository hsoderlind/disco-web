import { Result } from 'antd';
import { useRouteError } from 'react-router-dom';
import { ServerValidationError } from '../../lib/error/types';
import { MainContentLayout } from '../layout/content-layout/MainContentLayout';
import { ContentLayout } from '../layout/content-layout/ContentLayout';

export function ErrorBoundary() {
	const error = useRouteError() as ServerValidationError;
	const status = error.response?.status;
	const isResultStatus = status === 403 || status === 404 || status === 500;

	return (
		<ContentLayout>
			<MainContentLayout>
				<Result status={isResultStatus ? status : 'error'} title={status?.toString()} subTitle={error.message} />
			</MainContentLayout>
		</ContentLayout>
	);
}
