import { FC } from 'react';
import { Upload } from '../upload/types';
import classes from './product-image-upload-list.module.scss';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ProductImageUploadItem } from './ProductImageUploadItem';

export type ProductImageUploadListProps = Readonly<{
	files?: Upload[];
}>;

export const ProductImageUploadList: FC<ProductImageUploadListProps> = ({ files }) => {
	const [parent] = useAutoAnimate();

	return (
		<ul ref={parent} className={classes['product-image-upload-list']}>
			{typeof files !== 'undefined' &&
				files.map((file) => <ProductImageUploadItem key={file.get<string>('key')} file={file} />)}
		</ul>
	);
};
