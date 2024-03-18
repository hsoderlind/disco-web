import { CategoryCollection } from '../../services/category/CategoryCollection';
import { Alert, Button, Menu, MenuProps, Skeleton, Space } from 'antd';
import { useGetCategories } from '../../services/category/hooks/useGetCategories';
import { useShopStore } from '../../services/shop/store';
import { useQuery } from '@tanstack/react-query';
import { IServerValidationError } from '../../lib/error/types';
import { PlusOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';

export const CategoryMenu = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const shopId = useShopStore((state) => state.shop.id);
	const [queryKey, queryFn] = useGetCategories(shopId);
	const { data: categories, isLoading, isSuccess, isError, error } = useQuery(queryKey, queryFn);

	const onClick: MenuProps['onClick'] = (e) => {
		setSearchParams({ category: e.key });
	};

	if (isLoading) {
		return <Skeleton active />;
	}

	if (isError) {
		return <Alert type='error' message={(error as IServerValidationError).message} />;
	}

	if (isSuccess) {
		const menuItems = buildMenuItems(categories.children(0));
		const ancestors =
			searchParams.has('category') && typeof categories !== 'undefined'
				? categories.ancestors(parseInt(searchParams.get('category')!))
				: undefined;

		return (
			<>
				<Menu
					mode='inline'
					theme='dark'
					onClick={onClick}
					items={menuItems}
					defaultSelectedKeys={searchParams.has('category') ? [searchParams.get('category')!] : undefined}
					defaultOpenKeys={ancestors && ancestors.map((category) => category.getKey().toString())}
				/>
				<Space style={{ margin: '8px 0' }}>
					<Button type='primary' icon={<PlusOutlined />}>
						Ny kategori
					</Button>
				</Space>
			</>
		);
	}

	return null;
};

function buildMenuItems(categories: CategoryCollection): MenuProps['items'] {
	return categories.map((category) => ({
		label: category.get<string>('name'),
		key: category.getKey().toString(),
		// type: category.get<number>('children_count') > 0 ? 'group' : undefined,
		children:
			category.get<number>('children_count') > 0 ? buildMenuItems(categories.children(category.getKey())) : undefined
	}));
}
