import { Tabs as AntTabs, TabsProps } from 'antd';
import { useTabStore } from './store';
import { useLocation, useNavigate } from 'react-router-dom';

export const Tabs = () => {
	const store = useTabStore();
	const navigate = useNavigate();
	const location = useLocation();
	const activeKey = `${location.pathname}${location.search}`;

	const items: TabsProps['items'] = store.tabs.map((tab) => ({
		key: tab.key,
		label: tab.label,
		closable: true
	}));

	const handleTabClick: TabsProps['onTabClick'] = (key: string) => navigate(key);

	const handleEdit: TabsProps['onEdit'] = (e, action) => {
		console.log('e', e);
		const tab = store.tabs.find((t) => t.key === e);

		if (tab && action === 'remove') {
			store.remove(tab);
		}
	};

	return (
		<AntTabs
			className='flex-1'
			activeKey={activeKey}
			type='editable-card'
			items={items}
			onTabClick={handleTabClick}
			onEdit={handleEdit}
			hideAdd
		/>
	);
};
