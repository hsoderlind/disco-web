import { FC } from 'react';
import { ProductFileUploadContextType, ProductFileUploadProps } from './types';
import { OnDropCb } from '../upload/types';
import { CloudUploadOutlined } from '@ant-design/icons';
import { UploadHero } from '../upload/UploadHero';
import { ProductFileUploadContext } from './ProductFileUploadContext';
import { ProductFileUploadList } from './ProductFileUploadList';
import { useProductFileStore } from './store';

export const ProductFileUpload: FC<ProductFileUploadProps> = ({ append, fields, move, remove }) => {
	const store = useProductFileStore();
	const value: ProductFileUploadContextType = {
		remove,
		move
	};

	const handleDrop: OnDropCb = (acceptedFiles) => {
		store.add(acceptedFiles);
		append(acceptedFiles);
	};

	return (
		<ProductFileUploadContext.Provider value={value}>
			<div className='mb-input'>
				<div className='product-file-upload'>
					<UploadHero
						inputName='product_file'
						maxFiles={5}
						onDrop={handleDrop}
						icon={<CloudUploadOutlined />}
						infoText='Dra och släpp fil(er) här eller klicka för att ladda upp'
					/>
				</div>
				<ProductFileUploadList fields={fields} models={store.models} />
			</div>
		</ProductFileUploadContext.Provider>
	);
};
