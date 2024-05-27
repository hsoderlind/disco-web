import { Outlet, useParams } from 'react-router-dom';
import { useGetShopByUrlAlias } from '../../services/shop/hooks/useGetShopByUrlAlias';
import { useQuery } from '@tanstack/react-query';
import { PageLoader } from '../../components/page-loader/PageLoader';
import { useShopStore } from '../../services/shop/store';
import { useLoadUserPermissions } from '../../services/permissions/hooks/useLoadUserPermissions';

export function Component() {
	const params = useParams<Record<string, string>>();
	const [queryKey, queryFn] = useGetShopByUrlAlias(params.urlAlias!);
	const updateStore = useShopStore((state) => state.update);
	const {
		data: shop,
		isFetching,
		isLoading
	} = useQuery(queryKey, queryFn, {
		onSuccess: (data) => updateStore(data.toJSON())
	});
	useLoadUserPermissions(shop?.getKey() as number, { enabled: !!shop?.getKey() });

	return <>{isFetching || isLoading ? <PageLoader /> : <Outlet />}</>;
}
