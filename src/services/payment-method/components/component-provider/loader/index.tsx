import { Spin } from 'antd';

export const Loader = () => {
	return (
		<div className='center-block'>
			<div>
				<Spin />
			</div>
		</div>
	);
};
