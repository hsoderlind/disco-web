import { FC, memo, useState } from 'react';
import { useShopStore } from '../../../../services/shop/store';
import classes from './product-image-list.module.scss';
import { Num } from '../../../../lib/number/Num';
import { Button, Dropdown, MenuProps, Progress } from 'antd';
import { DragOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useQuery } from '@tanstack/react-query';
import { ImageCardProps } from './types';
import { useProductImageContext } from './hooks/useProductImageContext';
import { File } from '../../../../services/file/File';

const InternalImageCard: FC<ImageCardProps> = ({ id, index, model }) => {
	const [progress, setProgress] = useState(model.get<number>('uploadProgress'));
	model.getUploadProgress(setProgress);
	const { remove } = useProductImageContext();
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	};

	const shopId = useShopStore((state) => state.shop.id);

	const { data: url } = useQuery([model.getEndpoint(), shopId, model.getKey()], () =>
		model.get<File>('model').download('product_image')
	);

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
				<div className='w-full px-4 py2'>
					<Progress percent={progress} />
				</div>
				<div className='flex flex-row justify-between items-center w-full px-4 py-2'>
					<DragOutlined {...attributes} {...listeners} />
					<div className='product-image-list__size'>{Num.formatBytes(model.get<File>('model').get('size'))}</div>
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
