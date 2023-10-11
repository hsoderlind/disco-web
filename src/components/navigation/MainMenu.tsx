import { Menu, MenuProps } from 'antd';
import { FC } from 'react';

const MainMenu: FC = () => {
	const items: MenuProps['items'] = [];

	const onClick: MenuProps['onClick'] = (e) => {
		console.log(e);
	};

	return <Menu onClick={onClick} items={items} mode='horizontal' theme='dark' />;
};

export default MainMenu;
