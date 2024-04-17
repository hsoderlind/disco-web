import { Upload } from '../upload/Upload';
import classes from './product-image-upload.module.scss';
import { CloudUploadOutlined } from '@ant-design/icons';
import { FC, useState } from 'react';
import { Upload as UploadModel } from '../upload/types';
import { ProductImageUploadList } from './ProductImageUploadList';
import { ProductImageContextType } from './types';
import { ProductImageContext } from './ProductImageContext';

export type ProductImageUploadProp = {
	append: (model: UploadModel) => void;
};

export const ProductImageUpload: FC<ProductImageUploadProp> = ({ append }) => {
	const [acceptedFiles, setAcceptedFiles] = useState<UploadModel[] | undefined>();

	const addToForm = (file: UploadModel) => {
		append(file);
		// removeFileFromAcceptedFiles(file);
	};

	const removeFileFromAcceptedFiles = (file: UploadModel) => {
		setAcceptedFiles((models) => {
			if (typeof models === 'undefined') {
				return;
			}

			const index = models.findIndex((model) => model.getKey() !== file.getKey());
			models.splice(index, 1);
			return [...models];
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
							addToForm(file);
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
