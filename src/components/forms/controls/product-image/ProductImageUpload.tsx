import { FC } from 'react';
import { ProductImageContextType, ProductImageUploadProp } from './types';
import { ProductImageContext } from './ProductImageContext';
import { useProductImageStore } from './store';
import { OnDropCb } from '../upload/types';
import { UploadHero } from '../upload/UploadHero';
import { CloudUploadOutlined } from '@ant-design/icons';
import { ProductImageList } from './ProductImageList';

export const ProductImageUpload: FC<ProductImageUploadProp> = ({ append, fields, move, remove }) => {
	const store = useProductImageStore();

	const value: ProductImageContextType = {
		remove,
		move
	};

	const handleDrop: OnDropCb = (acceptedFiles) => {
		store.add(acceptedFiles);
		append(acceptedFiles);
	};

	return (
		<ProductImageContext.Provider value={value}>
			<div className='mb-input'>
				<UploadHero
					inputName='product_image'
					accept={{ 'image/*': [] }}
					onDrop={handleDrop}
					icon={<CloudUploadOutlined />}
					infoText='Dra och släpp bild(er) här eller klicka för att ladda upp'
				/>
				<ProductImageList fields={fields} models={store.models} />
			</div>
		</ProductImageContext.Provider>
	);
};
