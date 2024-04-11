import { useDropzone } from 'react-dropzone';
import { CommonUploadProps } from './types';
import { makeOnDrop, makeOnDropAccepted } from './helpers';
import { useShopStore } from '../../../../services/shop/store';

export const Upload = ({ onDrop, onUploaded, onRejection, ...props }: CommonUploadProps) => {
	const shopId = useShopStore((state) => state.shop.id);

	const { getRootProps, getInputProps } = useDropzone({
		...props,
		onDrop: makeOnDrop(shopId, onDrop, onUploaded, onRejection),
		onDropAccepted: makeOnDropAccepted(shopId, onDrop, onUploaded)
	});

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
		</div>
	);
};
