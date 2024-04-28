import { FC } from 'react';
import { ProductImageContextType } from './types';
import { ProductImageContext } from './ProductImageContext';
import { useProductImageStore } from './store';
import { OnDropCb, Upload } from '../../../../components/forms/controls/upload/types';
import { UploadHero } from '../../../../components/forms/controls/upload/UploadHero';
import { CloudUploadOutlined } from '@ant-design/icons';
import { ProductImageList } from './ProductImageList';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ProductSchemaType } from '../../../../services/product/types';
import { File } from '../../../../services/file/File';
import { Typography } from 'antd';

export const ProductImageUpload: FC = () => {
	const { control } = useFormContext<ProductSchemaType>();
	const { fields, append, remove } = useFieldArray({ control, name: 'images', keyName: 'key' });
	const models = useProductImageStore((state) => state.models);
	const store = useProductImageStore();

	const appendToForm = (model: Upload) => {
		append({
			uploadModelRef: model.getKey(),
			sort_order: 0,
			use_as_cover: false,
			meta: {
				id: model.get<File>('model').get('id'),
				extension: model.get<File>('model').get('extension'),
				filename: model.get<File>('model').get('filename'),
				mimetype: model.get<File>('model').get('mimetype'),
				size: model.get<File>('model').get('size'),
				storage_provider: model.get<File>('model').get('storage_provider')
			}
		});
	};

	const removeFromStoreAndForm = (model: Upload) => {
		const index = fields.findIndex((field) => (field.uploadModelRef = model.getKey()));

		if (index >= 0) {
			remove(index);
		}

		store.remove(model);
	};

	const value: ProductImageContextType = {
		append: appendToForm,
		remove: removeFromStoreAndForm,
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
