import { FC, memo, useState } from 'react';
import classes from './product-image-list.module.scss';
import { Num } from '../../../../lib/number/Num';
import { Button, Dropdown, MenuProps, Progress } from 'antd';
import { DragOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ImageCardProps } from './types';
import { useProductImageContext } from './hooks/useProductImageContext';
import { File } from '../../../../services/file/File';
import { Image } from '../../../../components/image/Image';

const InternalImageCard: FC<ImageCardProps> = ({ id, model, index }) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
	const [progress, setProgress] = useState(model.get<number>('uploadProgress'));
	const [isUploaded, setIsUploaded] = useState(model.get<boolean>('isUploaded'));
	const { remove } = useProductImageContext();

	model.getUploadProgress(setProgress);
	model.checkIsUploaded((uploaded) => uploaded && setIsUploaded(true));

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	};

	const removeImage = () => {
		remove(index);
		model.delete();
	};

	const onActionMenuClick: MenuProps['onClick'] = (info) => {
		switch (info.key) {
			case 'delete':
				removeImage();
		}
	};

	return (
		<>
			<div style={style} ref={setNodeRef} className={classes['product-image-list__item']}>
				<div className={classes['product-image-list__img-col']}>
					<Image
						src={() => model.get<File>('model').download()}
						className={classes['product-image-list__img-col__img']}
						queryKey={model.get<File>('model').get('id')}
						downloadingIsDisabled={!isUploaded}
					/>
				</div>
				<div className='w-full px-4 pt-2'>
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
