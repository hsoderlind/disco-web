import { FC, memo } from 'react';
import { ProductSchemaType } from '../../../../../services/product/types';
import { ExtractObjectStructure } from '../../../../../types/common';
import { useShopStore } from '../../../../../services/shop/store';
import classes from './product-image-list.module.scss';
import { Num } from '../../../../../lib/number/Num';
import { UseFieldArrayRemove } from 'react-hook-form';
import { Button, Dropdown, MenuProps } from 'antd';
import { DragOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { File } from '../../../../../services/file/File';
import { useQuery } from '@tanstack/react-query';

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
	const model = new File({ id: parseInt(image.key.substring(3)) }, shopId);

	const { data: url } = useQuery([model.getEndpoint(), shopId, model.getKey()], () => model.download('product_image'));

	const removeImage = async () => {
		await model.delete();
		remove(index);
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
					<img src={url} className={classes['product-image-list__img-col__img']} />
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
