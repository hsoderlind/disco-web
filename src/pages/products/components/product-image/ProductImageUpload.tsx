import { FC } from 'react';
import { ProductImageContextType } from './types';
import { ProductImageContext } from './ProductImageContext';
import { useProductImageStore } from './store';
import { OnDropCb } from '../../../../components/forms/controls/upload/types';
import { UploadHero } from '../../../../components/forms/controls/upload/UploadHero';
import { CloudUploadOutlined } from '@ant-design/icons';
import { ProductImageList } from './ProductImageList';
import { Typography } from 'antd';

export const ProductImageUpload: FC = () => {
	const models = useProductImageStore((state) => state.models);
	const store = useProductImageStore();

	const value: ProductImageContextType = {
		remove: store.remove,
		move: store.move
	};

	const handleDrop: OnDropCb = (acceptedFiles) => {
		store.add(acceptedFiles);
	};

	return (
		<ProductImageContext.Provider value={value}>
			<Typography.Title level={2}>Produktbilder</Typography.Title>
			<div className='mb-input'>
				<UploadHero
					inputName='product_image'
					accept={{ 'image/*': [] }}
					onDrop={handleDrop}
					icon={<CloudUploadOutlined />}
					infoText='Dra och släpp bild(er) här eller klicka för att ladda upp'
				/>
				<ProductImageList models={models} />
			</div>
		</ProductImageContext.Provider>
	);
};
