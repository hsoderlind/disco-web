import { FC } from 'react';
import { ProductFileUploadContextType } from './types';
import { OnDropCb } from '../../../../components/forms/controls/upload/types';
import { CloudUploadOutlined } from '@ant-design/icons';
import { UploadHero } from '../../../../components/forms/controls/upload/UploadHero';
import { ProductFileUploadContext } from './ProductFileUploadContext';
import { ProductFileUploadList } from './ProductFileUploadList';
import { useProductFileStore } from './store';
import { Typography } from 'antd';

export const ProductFileUpload: FC = () => {
	const store = useProductFileStore();
	const value: ProductFileUploadContextType = {
		remove: store.remove,
		move: store.move
	};

	const handleDrop: OnDropCb = (acceptedFiles) => {
		store.add(acceptedFiles);
	};

	return (
		<ProductFileUploadContext.Provider value={value}>
			<Typography.Title level={2}>Produktfiler</Typography.Title>
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
				<ProductFileUploadList models={store.models} />
			</div>
		</ProductFileUploadContext.Provider>
	);
};
