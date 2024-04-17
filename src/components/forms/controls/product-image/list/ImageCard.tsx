import { FC, memo } from 'react';
import { ProductSchemaType } from '../../../../../services/product/types';
import { ExtractObjectStructure } from '../../../../../types/common';
import { useShopStore } from '../../../../../services/shop/store';
import { ProductImage } from '../../../../../services/product-image/ProductImage';
import classes from './product-image-list.module.scss';
import { Num } from '../../../../../lib/number/Num';
import { UseFieldArrayRemove } from 'react-hook-form';
import { Button, Dropdown, MenuProps } from 'antd';
import { DragOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useDeleteProductImage } from '../../../../../services/product-image/hooks/useDeleteProductImage';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export type ImageCardProps = {
	image: ExtractObjectStructure<ProductSchemaType['images']>;
	index: number;
	remove: UseFieldArrayRemove;
};

const InternalImageCard: FC<ImageCardProps> = ({ image, index, remove }) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.key });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	};

	const shopId = useShopStore((state) => state.shop.id);
	const model = new ProductImage({ id: parseInt(image.key.substring(3)) }, shopId);
	const deleteImage = useDeleteProductImage();

	const removeImage = () => {
		deleteImage(model, () => remove(index));
	};

	const onActionMenuClick: MenuProps['onClick'] = (info) => {
		console.log('onActionMenuClick');
		switch (info.key) {
			case 'delete':
				removeImage();
		}
	};

	return (
		<>
			<div style={style} ref={setNodeRef} className={classes['product-image-list__item']}>
				<div className={classes['product-image-list__img-col']}>
					<img
						// src={model?.download()}
						src={`https://loremflickr.com/640/400?rnd=`}
						className={classes['product-image-list__img-col__img']}
					/>
				</div>
				<div className='flex flex-row justify-between items-center w-full px-4 py-2'>
					<DragOutlined {...attributes} {...listeners} />
					<div className='product-image-list__size'>{Num.formatBytes(image.meta.size)}</div>
					<Dropdown
						menu={{
							items: [
								{
									label: 'Redigera',
									key: 'edit'
								},
								{
									label: 'Radera',
									key: 'delete',
									danger: true
								}
							],
							onClick: onActionMenuClick
						}}>
						<Button type='link' icon={<EllipsisOutlined />} />
					</Dropdown>
				</div>
			</div>
		</>
	);
};

export const ImageCard = memo(InternalImageCard);
