import { FC, useState } from 'react';
import { ReactCommonProps } from '../../types/common';
import { useFetchAllUserShops } from '../../services/shop/hooks/useFetchAllUserShops';
import { useAuthContext } from '../auth/useAuthContext';
import { useQuery } from '@tanstack/react-query';
import { ShopsContextType } from './types';
import { ShopsContext } from './ShopsContext';
import Shop from '../../services/shop/Shop';

const ShopsProvider: FC<ReactCommonProps> = ({ children }) => {
	const [selectedShop, setSelectedShop] = useState<Shop | undefined>();
	const { user } = useAuthContext();
	const [queryKey, queryFn] = useFetchAllUserShops();

	const { isLoading, isError, isSuccess, data } = useQuery(queryKey, queryFn, {
		enabled: !!user,
		retry: false
	});

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
