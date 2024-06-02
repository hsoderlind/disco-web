import { FC } from 'react';
import { ProductFileUploadContextType } from './types';
import { OnDropCb } from '../../../../components/forms/controls/upload/types';
import { CloudUploadOutlined } from '@ant-design/icons';
import { UploadHero } from '../../../../components/forms/controls/upload/UploadHero';
import { ProductFileUploadContext } from './ProductFileUploadContext';
import { ProductFileUploadList } from './ProductFileUploadList';
import { Typography } from 'antd';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ProductSchemaType } from '../../../../services/product/types';

export const ProductFileUpload: FC = () => {
	const {
		control,
		formState: { errors }
	} = useFormContext<ProductSchemaType>();
	console.log(errors);
	const { append, remove, move } = useFieldArray({ control, name: 'files' });
	const value: ProductFileUploadContextType = {
		remove,
		move
	};

	const handleDrop: OnDropCb = (acceptedFiles) => {
		append(acceptedFiles);
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
						error={errors.files}
					/>
				</div>
				<ProductFileUploadList />
			</div>
		</ProductFileUploadContext.Provider>
	);
};
