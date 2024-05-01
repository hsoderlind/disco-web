import { Skeleton } from 'antd';
import { useCheckTokenExist } from '../auth/hooks/useCheckTokenExist';
import { AuthButton } from './AuthButton';
import { Toolpanel } from './Toolpanel';

export const DiscogsButton = () => {
	const { data, isLoading } = useCheckTokenExist();

	if (isLoading) {
		return <Skeleton.Button active />;
	}

	if (data?.hasToken) {
		return <Toolpanel />;
	}

	return <AuthButton />;
};
