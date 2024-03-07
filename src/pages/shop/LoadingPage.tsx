import { Outlet, useParams } from 'react-router-dom';
import { useGetShopByUrlAlias } from '../../services/shop/hooks/useGetShopByUrlAlias';
import { useQuery } from '@tanstack/react-query';
import { PageLoader } from '../../components/page-loader/PageLoader';
import { useShopStore } from '../../services/shop/store';

export const LoadingPage = () => {
	const params = useParams<Record<string, string>>();
	const [queryKey, queryFn] = useGetShopByUrlAlias(params.urlAlias!);
	const updateStore = useShopStore((state) => state.update);
	const { isFetching } = useQuery(queryKey, queryFn, {
		onSuccess: (data) => updateStore(data.toJSON())
	});

	return <>{isFetching ? <PageLoader /> : <Outlet />}</>;
};
