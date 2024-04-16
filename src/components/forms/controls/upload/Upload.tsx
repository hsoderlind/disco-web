import { useDropzone } from 'react-dropzone';
import { UploadProps } from './types';
import { makeOnDrop } from './helpers';
import { useShopStore } from '../../../../services/shop/store';

export const Upload = ({ inputName, children, onDrop, onUploaded, onError, ...props }: UploadProps) => {
	const shopId = useShopStore((state) => state.shop.id);

	const { getRootProps, getInputProps } = useDropzone({
		...props,
		onDrop: makeOnDrop(inputName, shopId, onDrop, onUploaded, onError)
	});

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			{children}
		</div>
	);
};
