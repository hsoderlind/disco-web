import { Upload } from '../upload/Upload';
import classes from './product-image-upload.module.scss';
import { CloudUploadOutlined } from '@ant-design/icons';
import { FC, useState } from 'react';
import { Upload as UploadModel, UploadCollection } from '../upload/types';
import { ProductImageUploadList } from './ProductImageUploadList';
import { useCreateProductImage } from '../../../../services/product-image/hooks/useCreateProductImage';
import { useMutation } from '@tanstack/react-query';
import { TEST_DATA } from './test-data';
import { AppendCb, ProductImageContextType } from './types';
import { ProductImageContext } from './ProductImageContext';

export type ProductImageUploadProp = {
	append: AppendCb;
};

export const ProductImageUpload: FC<ProductImageUploadProp> = ({ append }) => {
	const [acceptedFiles, setAcceptedFiles] = useState<UploadCollection | undefined>(TEST_DATA);
	const [mutationFn] = useCreateProductImage();
	const mutation = useMutation(mutationFn);

	const createProductImage = (file: UploadModel) => {
		mutation.mutate(file, {
			onSuccess(model) {
				removeFileFromAcceptedFiles(file);
				append(model);
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
