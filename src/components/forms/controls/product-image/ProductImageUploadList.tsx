import { FC } from 'react';
import { UploadCollection } from '../upload/types';
import classes from './product-image-upload-list.module.scss';
import { Image, Progress } from 'antd';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export type ProductImageUploadListProps = {
	files?: UploadCollection;
};

export const ProductImageUploadList: FC<ProductImageUploadListProps> = ({ files }) => {
	console.log('files', files);
	const [parent] = useAutoAnimate();

	return (
		<ul ref={parent} className={classes['product-image-upload-list']}>
			{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
				<li key={`key-${index}`} className={classes['product-image-upload-list__item']}>
					<Image
						src={`https://picsum.photos/id/${Math.floor(Math.random() * 59)}/600/400`}
						className={classes['product-image-upload-list__img']}
					/>
					<Progress percent={Math.floor(Math.random() * 100)} size='small' />
				</li>
			))}
		</ul>
	);
};
