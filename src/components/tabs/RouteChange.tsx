import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTabStore } from './store';
import { Tab } from './types';

export const RouteChange = () => {
	const location = useLocation();
	const tabStore = useTabStore();

	useEffect(() => {
		const tab: Tab = {
			key: `${location.pathname}${location.search}`,
			label: location.state?.title ?? 'rubrik saknas',
			url: `${location.pathname}${location.search}`
		};
		tabStore.add(tab);
		return () => {};
	}, [location]);

	return <Outlet />;
};
