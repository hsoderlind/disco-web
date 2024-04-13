import { ArrayPath, Control, FieldValues, useFieldArray } from 'react-hook-form';
import { Upload } from '../upload/Upload';
import classes from './product-image-upload.module.scss';
import { CloudUploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { UploadCollection } from '../upload/types';
import { ProductImageUploadList } from './ProductImageUploadList';

type Fields = {
	images: {
		use_as_cover: boolean;
		sort_order: number;
		meta: {
			filename: string;
			size: number;
			mimetype: string;
			path?: string;
			extension?: string;
		};
	}[];
};

export type ProductImageProps<TFieldValues extends FieldValues = Fields> = {
	control: Control<TFieldValues>;
	name: ArrayPath<TFieldValues>;
};

export const ProductImage = <TFieldValues extends FieldValues = Fields>({
	control,
	name
}: ProductImageProps<TFieldValues>) => {
	const [acceptedFiles, setAcceptedFiles] = useState<UploadCollection | undefined>();
	const { fields, append, remove } = useFieldArray({ control, name, keyName: 'key' });
	console.log('fields', fields);
	console.log('append', append);
	console.log('remove', remove);

	return (
		<div className='mb-input'>
			<div className={classes['product-image-upload']}>
				<Upload
					accept={{ 'image/*': [] }}
					onDrop={(files) => setAcceptedFiles(files)}
					onError={(file) => {
						setAcceptedFiles((collection) => {
							if (typeof collection === 'undefined') {
								return;
							}

							const updated = collection.update(file);

							if (!updated) {
								return collection;
							}

							return new UploadCollection(collection.getItems());
						});
					}}
					onUploaded={(file) => {
						console.log('onUploaded');
						setAcceptedFiles((collection) => {
							if (typeof collection === 'undefined') {
								return;
							}

							collection?.findAndRemove(file.getKey());
							// TODO: Add a new form entry
							return new UploadCollection(collection?.getItems());
						});
					}}>
					<div className={classes['product-image-upload__content']}>
						<CloudUploadOutlined />
						<span className={classes['product-image-upload__content__text']}>
							Dra och släpp fil här eller klicka för att ladda upp
						</span>
					</div>
				</Upload>
			</div>
			<ProductImageUploadList files={acceptedFiles} />
		</div>
	);
};
