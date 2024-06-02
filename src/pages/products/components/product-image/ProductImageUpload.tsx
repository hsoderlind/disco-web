import { FC } from 'react';
import { ProductImageContextType } from './types';
import { ProductImageContext } from './ProductImageContext';
import { OnDropCb } from '../../../../components/forms/controls/upload/types';
import { UploadHero } from '../../../../components/forms/controls/upload/UploadHero';
import { CloudUploadOutlined } from '@ant-design/icons';
import { ProductImageList } from './ProductImageList';
import { Typography } from 'antd';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ProductSchemaType } from '../../../../services/product/types';

export const ProductImageUpload: FC = () => {
	const {
		control,
		formState: { errors }
	} = useFormContext<ProductSchemaType>();
	const { append, move, remove } = useFieldArray<ProductSchemaType>({
		name: 'images',
		control
	});

	const value: ProductImageContextType = {
		remove,
		move
	};

	const handleDrop: OnDropCb = (acceptedFiles) => {
		append(acceptedFiles);
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
					error={errors.images}
				/>
				<ProductImageList />
			</div>
		</ProductImageContext.Provider>
	);
};
