import { FC, useEffect, useState } from 'react';
import { ReactCommonProps } from '../../types/common';
import { useFetchAllUserShops } from '../../services/shop/hooks/useFetchAllUserShops';
import { useAuthContext } from '../auth/useAuthContext';
import { useQuery } from '@tanstack/react-query';
import { ShopsContextType } from './types';
import { ShopsContext } from './ShopsContext';
import Shop from '../../services/shop/Shop';
import { useParams } from 'react-router-dom';

const ShopsProvider: FC<ReactCommonProps> = ({ children }) => {
	const [selectedShop, setSelectedShop] = useState<Shop | undefined>();
	const { urlAlias } = useParams();
	const { user } = useAuthContext();
	const [queryKey, queryFn] = useFetchAllUserShops();

	const { isLoading, isError, isSuccess, data } = useQuery(queryKey, queryFn, {
		enabled: !!user,
		retry: false
	});

	useEffect(() => {
		if (urlAlias && data && data.length > 0) {
			const shop = data.find((entry) => entry.get<string>('url_alias') === urlAlias);

			if (shop) {
				setSelectedShop(shop);
			}
		}
	}, [data, setSelectedShop, urlAlias]);

	const value: ShopsContextType = {
		shops: data,
		selectedShop,
		setSelectedShop,
		hasShops: data ? data.length > 0 : false,
		isLoading,
		isSuccess,
		isError
	};

	return <ShopsContext.Provider value={value}>{children}</ShopsContext.Provider>;
};

export default ShopsProvider;
