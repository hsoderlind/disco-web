import { FC } from 'react';
import { ProductFileUploadContextType } from './types';
import { OnDropCb } from '../../../../components/forms/controls/upload/types';
import { CloudUploadOutlined } from '@ant-design/icons';
import { UploadHero } from '../../../../components/forms/controls/upload/UploadHero';
import { ProductFileUploadContext } from './ProductFileUploadContext';
import { ProductFileUploadList } from './ProductFileUploadList';
import { useProductFileStore } from './store';
import { useFieldArray, useFormContext, FieldArrayWithId } from 'react-hook-form';
import { ProductSchemaType } from '../../../../services/product/types';
import { File } from '../../../../services/file/File';
import { Typography } from 'antd';

export const ProductFileUpload: FC = () => {
	const { control } = useFormContext<ProductSchemaType>();
	const { fields, append, remove, move } = useFieldArray({ control, name: 'files', keyName: 'key' });
	const store = useProductFileStore();
	const value: ProductFileUploadContextType = {
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
					meta: {
						id: model.get<File>('model').get('id'),
						extension: model.get<File>('model').get('extension'),
						filename: model.get<File>('model').get('filename'),
						mimetype: model.get<File>('model').get('mimetype'),
						size: model.get<File>('model').get('size'),
						storage_provider: model.get<File>('model').get('storage_provider')
					}
				} as FieldArrayWithId<ProductSchemaType, 'files', 'key'>;
			})
		);
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
				<ProductFileUploadList fields={fields} models={store.models} />
			</div>
		</ProductFileUploadContext.Provider>
	);
};
