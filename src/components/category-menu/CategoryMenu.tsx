import { CategoryCollection } from '../../services/category/CategoryCollection';
import { Alert, Button, Menu, MenuProps, Skeleton, Space } from 'antd';
import { useGetCategories } from '../../services/category/hooks/useGetCategories';
import { useShopStore } from '../../services/shop/store';
import { useQuery } from '@tanstack/react-query';
import { IServerValidationError } from '../../lib/error/types';
import { PlusOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import { CreateCategoryModal } from '../modals/CreateCategoryModal';
import { useState } from 'react';
import { Category } from '../../services/category/Category';

export const CategoryMenu = () => {
	const [open, setOpen] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const shopId = useShopStore((state) => state.shop.id);
	const [queryKey, queryFn] = useGetCategories(shopId);
	const { data: categories, isLoading, isSuccess, isError, error, refetch } = useQuery(queryKey, queryFn);

	const onClick: MenuProps['onClick'] = (e) => {
		setSearchParams({ category: e.key });
	};

	const openModal = () => setOpen(true);

	const onCancel = () => setOpen(false);

	const onFinish = () => {
		refetch();
		setOpen(false);
	};

	if (isLoading) {
		return <Skeleton active />;
	}

	if (isError) {
		return <Alert type='error' message={(error as IServerValidationError).message} />;
	}

	if (isSuccess) {
		const menuItems = buildMenuItems(categories);
		const categoryId = searchParams.has('category') ? parseInt(searchParams.get('category')!) : 0;
		const ancestors = categoryId > 0 ? categories.ancestors(categoryId) : undefined;

		let category: Category;
		if (categoryId > 0) {
			category = categories.find(categoryId)!;
		} else {
			category = new Category({ name: 'Topp' }, shopId);
		}

		return (
			<>
				<Space style={{ marginBlockEnd: '8px' }}>
					<span className='label'>Vald kategori</span>
					<span className='output'>{category.get<string>('name')}</span>
				</Space>
				<Menu
					mode='inline'
					theme='light'
					onClick={onClick}
					items={menuItems}
					defaultSelectedKeys={searchParams.has('category') ? [searchParams.get('category')!] : undefined}
					defaultOpenKeys={ancestors && ancestors.map((category) => category.getKey().toString())}
				/>
				<Space style={{ margin: '8px 0' }}>
					<Button type='link' onClick={openModal} icon={<PlusOutlined />}>
						Ny kategori
					</Button>
				</Space>
				{open && <CreateCategoryModal open onCancel={onCancel} onFinish={onFinish} />}
			</>
		);
	}

	return null;
};

function buildMenuItems(categories: CategoryCollection, parentId = 0): MenuProps['items'] {
	const children = categories.children(parentId);

	return children.map((category) => {
		return {
			label: category.get<string>('name'),
			key: category.getKey().toString(),
			children: category.get<number>('children_count') > 0 ? buildMenuItems(categories, category.getKey()) : undefined
		};
	});
}
