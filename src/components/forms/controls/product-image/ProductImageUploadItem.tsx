import { FC, useState } from 'react';
import { Upload } from '../upload/types';
import classes from './product-image-upload-list.module.scss';
import { Image, Progress } from 'antd';

export type ProductImageUploadItemProps = {
	file: Upload;
};

export const ProductImageUploadItem: FC<ProductImageUploadItemProps> = ({ file }) => {
	const [progress, setProgress] = useState(0);
	file.getUploadProgress(setProgress);

	return (
		<li className={classes['product-image-upload-list__item']}>
			<Image src={file.get<string>('preview')} className={classes['product-image-upload-list__img']} />
			<Progress percent={progress} size='small' />
		</li>
	);
};
