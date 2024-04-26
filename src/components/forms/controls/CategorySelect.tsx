import { Alert, Skeleton, TreeSelect } from 'antd';
import { ComponentProps, FC } from 'react';
import { CategoryCollection } from '../../../services/category/CategoryCollection';
import { useShopStore } from '../../../services/shop/store';
import { useGetCategories } from '../../../services/category/hooks/useGetCategories';
import { useQuery } from '@tanstack/react-query';
import app from '../../../lib/application-builder/ApplicationBuilder';
import { ServerValidationError } from '../../../lib/error/types';

type TreeSelectProps = ComponentProps<typeof TreeSelect>;

export type CategorySelectProps = Omit<TreeSelectProps, 'treeData'>;

export const CategorySelect: FC<CategorySelectProps> = (props) => {
	const shopId = useShopStore((state) => state.shop.id);
	const [queryKey, queryFn] = useGetCategories(shopId);
	const {
		data: categories,
		isLoading,
		isSuccess,
		isError,
		error
	} = useQuery<CategoryCollection, ServerValidationError>(queryKey, queryFn);

	if (isLoading) {
		return <Skeleton.Input active />;
	}

	if (isError) {
		app.addErrorNotification({ message: error.code!, description: error.message });
		return <Alert type='error' message={error.message} />;
	}

	if (isSuccess) {
		const treeData = buildTree(categories);
		return <TreeSelect {...props} treeData={treeData} />;
	}
};

function buildTree(categories: CategoryCollection, parentId = 0): TreeSelectProps['treeData'] {
	const children = categories.children(parentId);

	return children.map((category) => {
		const id = category.getKey();
		const childrenCount = category.get<number>('children_count');

		return {
			title: category.get<string>('name'),
			value: id,
			children: childrenCount > 0 ? buildTree(categories, id) : undefined
		};
	});
}
