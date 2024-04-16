import { Upload } from '../upload/Upload';
import classes from './product-image-upload.module.scss';
import { CloudUploadOutlined } from '@ant-design/icons';
import { FC, useState } from 'react';
import { Upload as UploadModel, UploadCollection } from '../upload/types';
import { ProductImageUploadList } from './ProductImageUploadList';
import { useCreateProductImage } from '../../../../services/product-image/hooks/useCreateProductImage';
import { useMutation } from '@tanstack/react-query';
import { ProductImageContextType } from './types';
import { ProductImageContext } from './ProductImageContext';
import { Control, useFieldArray } from 'react-hook-form';
import { ProductSchemaType } from '../../../../services/product/types';
import { ProductImage } from '../../../../services/product-image/ProductImage';
import { File } from '../../../../services/file/File';

export type ProductImageUploadProp = {
	control: Control<ProductSchemaType>;
};

export const ProductImageUpload: FC<ProductImageUploadProp> = ({ control }) => {
	const [acceptedFiles, setAcceptedFiles] = useState<UploadCollection | undefined>();
	const { append } = useFieldArray({ control, name: 'images' });
	const [mutationFn] = useCreateProductImage();
	const mutation = useMutation(mutationFn);

	const addProductImageToForm = (model: ProductImage) => {
		append({
			key: `pi-${model.getKey()}`,
			sort_order: model.get('sort_order'),
			use_as_cover: model.get('use_as_cover'),
			meta: {
				extension: model.get<File>('meta').get('extension'),
				filename: model.get<File>('meta').get('filename'),
				mimetype: model.get<File>('meta').get('mimetype'),
				size: model.get<File>('meta').get('size')
			}
		});
	};

	const createProductImage = (file: UploadModel) => {
		mutation.mutate(file, {
			onSuccess(model) {
				removeFileFromAcceptedFiles(file);
				addProductImageToForm(model);
			}
		});
	};

	const removeFileFromAcceptedFiles = (file: UploadModel) => {
		setAcceptedFiles((collection) => {
			if (typeof collection === 'undefined') {
				return;
			}

			collection?.findAndRemove(file.getKey());
			return new UploadCollection(collection?.getItems());
		});
	};

	const contextValue: ProductImageContextType = {
		removeFailedUploadedFile: removeFileFromAcceptedFiles
	};

	return (
		<ProductImageContext.Provider value={contextValue}>
			<div className='mb-input'>
				<div className={classes['product-image-upload']}>
					<Upload
						inputName='product_image'
						accept={{ 'image/*': [] }}
						onDrop={(files) => setAcceptedFiles(files)}
						onUploaded={(file) => {
							createProductImage(file);
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
		</ProductImageContext.Provider>
	);
};
