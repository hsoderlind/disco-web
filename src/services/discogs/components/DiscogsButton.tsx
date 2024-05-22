import { Skeleton } from 'antd';
import { useCheckTokenExist } from '../auth/hooks/useCheckTokenExist';
import { AuthButton } from './AuthButton';
import { Toolpanel } from './Toolpanel';
import { useParams } from 'react-router-dom';
import { RouteParams } from '../../../types/common';

export const DiscogsButton = () => {
	const params = useParams<RouteParams>();
	const { data, isLoading } = useCheckTokenExist();

	if (!params.urlAlias) {
		return null;
	}

	if (isLoading) {
		return <Skeleton.Button active />;
	}

	if (data?.hasToken) {
		return <Toolpanel />;
	}

	return <AuthButton />;
};
