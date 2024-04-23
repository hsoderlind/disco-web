import { FC } from 'react';
import { ProductImageContextType } from './types';
import { ProductImageContext } from './ProductImageContext';
import { useProductImageStore } from './store';
import { OnDropCb } from '../../../../../components/forms/controls/upload/types';
import { UploadHero } from '../../../../../components/forms/controls/upload/UploadHero';
import { CloudUploadOutlined } from '@ant-design/icons';
import { ProductImageList } from './ProductImageList';
import { useFieldArray, useFormContext, FieldArrayWithId } from 'react-hook-form';
import { ProductSchemaType } from '../../../../../services/product/types';
import { File } from '../../../../../services/file/File';
import { Typography } from 'antd';

export const ProductImageUpload: FC = () => {
	const { control } = useFormContext<ProductSchemaType>();
	const { fields, append, remove, move } = useFieldArray({ control, name: 'images', keyName: 'key' });
	const store = useProductImageStore();

	const value: ProductImageContextType = {
		remove,
		move
	};

	const handleDrop: OnDropCb = (acceptedFiles) => {
		store.add(acceptedFiles);
		append(
			acceptedFiles.map((model) => {
				return {
					id: model.getKey(),
					sort_order: 0,
					use_as_cover: false,
					meta: {
						extension: model.get<File>('model').get('extension'),
						filename: model.get<File>('model').get('filename'),
						mimetype: model.get<File>('model').get('mimetype'),
						size: model.get<File>('model').get('size'),
						storage_provider: model.get<File>('model').get('storage_provider')
					}
				} as FieldArrayWithId<ProductSchemaType, 'images', 'key'>;
			})
		);
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
				<ProductImageList fields={fields} models={store.models} />
			</div>
		</ProductImageContext.Provider>
	);
};
