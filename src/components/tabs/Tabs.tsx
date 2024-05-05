import { Tabs as AntTabs, TabsProps as AntdTabsProps } from 'antd';
import { useTabStore } from './store';
import { useLocation, useNavigate } from 'react-router-dom';
import { TabsProps } from './types';
import { DiscogsButton } from '../../services/discogs/components/DiscogsButton';

export const Tabs = ({ renderExtraContent }: TabsProps) => {
	const store = useTabStore();
	const navigate = useNavigate();
	const location = useLocation();
	const activeKey = `${location.pathname}${location.search}`;

	const items: AntdTabsProps['items'] = store.tabs.map((tab) => ({
		key: tab.key,
		label: tab.label,
		closable: true
	}));

	const handleTabClick: AntdTabsProps['onTabClick'] = (key: string) => navigate(key);

	const handleEdit: AntdTabsProps['onEdit'] = (e, action) => {
		const tab = store.tabs.find((t) => t.key === e);

		if (tab && action === 'remove') {
			store.remove(tab);
		}
	};

	return (
		<AntTabs
			activeKey={activeKey}
			type='editable-card'
			items={items}
			tabBarExtraContent={
				typeof renderExtraContent !== 'undefined' ? (
					<>
						{renderExtraContent}
						<DiscogsButton />
					</>
				) : undefined
			}
			onTabClick={handleTabClick}
			onEdit={handleEdit}
			hideAdd
		/>
	);
};
