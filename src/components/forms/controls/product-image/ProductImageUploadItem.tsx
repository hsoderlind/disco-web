import { FC, useState } from 'react';
import { Upload } from '../upload/types';
import classes from './product-image-upload-list.module.scss';
import { Button, Progress } from 'antd';
import clsx from 'clsx';
import { DeleteOutlined } from '@ant-design/icons';
import { useProductImageContext } from './hooks/useProductImageContext';

export type ProductImageUploadItemProps = {
	file: Upload;
};

export const ProductImageUploadItem: FC<ProductImageUploadItemProps> = ({ file }) => {
	const [progress, setProgress] = useState(0);
	const { removeFailedUploadedFile } = useProductImageContext();
	file.getUploadProgress(setProgress);
	const isError = typeof file.get('error') !== 'undefined';

	return (
		<li
			className={clsx(classes['product-image-upload-list__item'], {
				[classes['product-image-upload-list__item--error']]: isError
			})}>
			<div className={classes['product-image-upload-list__img-wrapper']}>
				<img src={file.get<string>('preview')} className={classes['product-image-upload-list__img']} />
				<div className={classes['product-image-upload-list__delete-btn-wrapper']}>
					<Button type='default' danger icon={<DeleteOutlined />} onClick={() => removeFailedUploadedFile(file)}>
						Radera
					</Button>
				</div>
			</div>
			<Progress percent={progress} size='small' status={isError ? 'exception' : undefined} />
		</li>
	);
};
