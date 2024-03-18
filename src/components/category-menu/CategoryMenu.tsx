import { CategoryCollection } from '../../services/category/CategoryCollection';
import { Alert, Button, Menu, MenuProps, Skeleton, Space } from 'antd';
import { useGetCategories } from '../../services/category/hooks/useGetCategories';
import { useShopStore } from '../../services/shop/store';
import { useQuery } from '@tanstack/react-query';
import { IServerValidationError } from '../../lib/error/types';
import { PlusOutlined } from '@ant-design/icons';

export const CategoryMenu = () => {
	const shopId = useShopStore((state) => state.shop.id);
	const [queryKey, queryFn] = useGetCategories(shopId);
	const { data: categories, isLoading, isSuccess, isError, error } = useQuery(queryKey, queryFn);

	if (isLoading) {
		return <Skeleton active />;
	}

	if (isError) {
		return <Alert type='error' message={(error as IServerValidationError).message} />;
	}

	if (isSuccess) {
		const menuItems = buildMenuItems(categories.children(0));

		return (
			<>
				<Menu mode='inline' theme='dark' items={menuItems} />
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
		key: category.getKey(),
		type: category.get<number>('children_count') > 0 ? 'group' : undefined,
		children:
			category.get<number>('children_count') > 0 ? buildMenuItems(categories.children(category.getKey())) : undefined
	}));
}
