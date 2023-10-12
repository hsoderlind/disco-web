import { FC } from 'react';
import RegisterShopContainer from '../components/onboarding/RegisterShopContainer';

const Dashboard: FC = () => {
	return (
		<div className='p-5'>
			Dashboard
			<RegisterShopContainer />
		</div>
	);
};

export default Dashboard;
