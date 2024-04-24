import { CategoryCollection } from '../../services/category/CategoryCollection';
import { Alert, Button, Menu, MenuProps, Popconfirm, Skeleton, Tooltip } from 'antd';
import { useGetCategories } from '../../services/category/hooks/useGetCategories';
import { useShopStore } from '../../services/shop/store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IServerValidationError } from '../../lib/error/types';
import { DeleteFilled, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import { CreateCategoryModal } from '../modals/CreateCategoryModal';
import { useState } from 'react';
import { Category } from '../../services/category/Category';
import { useDeleteCategory } from '../../services/category/hooks/useDeleteCategory';
import { EditCategoryModal } from '../modals/EditCategoryModal';

export const CategoryMenu = () => {
	const [createModalopen, setCreateModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const shopId = useShopStore((state) => state.shop.id);

	const categoryId = searchParams.has('category') ? parseInt(searchParams.get('category')!) : 0;

	const [queryKey, queryFn] = useGetCategories(shopId);
	const { data: categories, isLoading, isSuccess, isError, error, refetch } = useQuery(queryKey, queryFn);

	const [mutationFn] = useDeleteCategory();
	const mutation = useMutation(mutationFn, {
		onSuccess: () => {
			refetch();
			searchParams.delete('category');
			setSearchParams(searchParams);
		}
	});

	const onDeleteCategory = () => {
		const categoryToDelete = categories?.find(categoryId);
		mutation.mutate(categoryToDelete!);
	};

	const onClick: MenuProps['onClick'] = (e) => {
		setSearchParams({ category: e.key });
	};

	const openCreateModal = () => setCreateModalOpen(true);

	const onCreateCancel = () => setCreateModalOpen(false);

	const onCreateFinish = () => {
		refetch();
		setCreateModalOpen(false);
	};

	const openEditModal = () => setEditModalOpen(true);

	const onEditCancel = () => setEditModalOpen(false);

	const onEditFinish = () => {
		refetch();
		setEditModalOpen(false);
	};

	if (isLoading) {
		return <Skeleton active />;
	}

	if (isError) {
		return <Alert type='error' message={(error as IServerValidationError).message} />;
	}

	if (isSuccess) {
		const menuItems = buildMenuItems(categories, onClick);
		const ancestors = categoryId > 0 ? categories.ancestors(categoryId) : undefined;

		let category: Category;
		if (categoryId > 0) {
			category = categories.find(categoryId)!;
		} else {
			category = new Category({ id: 0, name: 'Topp' }, shopId);
		}
		const isTopCategory = category.getKey() === 0;

		return (
			<>
				<div className='flex flex-column mb-3 pt-4 px-ant-space'>
					<div className='label label-sm label-smooth'>Vald kategori:</div>
					<div className='flex justify-between items-center flex-1'>
						<span className='output output-rough output-xl'>{category.get<string>('name')}</span>
						<span className='toolbar'>
							<Tooltip title={!isTopCategory ? 'Redigera kategorin' : ''}>
								<Button
									type='link'
									onClick={openEditModal}
									icon={<EditOutlined />}
									size='middle'
									disabled={isTopCategory}
								/>
							</Tooltip>
							<Popconfirm
								title='Radera kategorin'
								description='Är du verkligen säker på att du vill radera denna kategori?'
								okText='Ja'
								cancelText='Nej'
								onConfirm={() => onDeleteCategory()}>
								<Tooltip title={!isTopCategory ? 'Radera kategorin' : ''}>
									<Button type='link' icon={<DeleteFilled />} size='middle' disabled={isTopCategory} danger />
								</Tooltip>
							</Popconfirm>
							<Tooltip title='Ny kategori'>
								<Button type='link' onClick={openCreateModal} icon={<PlusOutlined />} size='middle' />
							</Tooltip>
						</span>
					</div>
				</div>
				<Menu
					mode='inline'
					theme='light'
					onClick={onClick}
					items={menuItems}
					defaultSelectedKeys={searchParams.has('category') ? [searchParams.get('category')!] : undefined}
					defaultOpenKeys={ancestors && ancestors.map((category) => category.getKey().toString())}
				/>
				{createModalopen && <CreateCategoryModal open onCancel={onCreateCancel} onFinish={onCreateFinish} />}
				<EditCategoryModal category={category} open={editModalOpen} onCancel={onEditCancel} onFinish={onEditFinish} />
			</>
		);
	}

	return null;
};

function buildMenuItems(
	categories: CategoryCollection,
	onTitleClick: MenuProps['onClick'],
	parentId = 0
): MenuProps['items'] {
	const children = categories.children(parentId);

	return children.map((category) => {
		return {
			label: category.get<string>('name'),
			key: category.getKey().toString(),
			onTitleClick,
			children:
				category.get<number>('children_count') > 0
					? buildMenuItems(categories, onTitleClick, category.getKey())
					: undefined
		};
	});
}
