import { useDropzone } from 'react-dropzone';
import { Button } from 'antd';
import { makeOnDrop } from './helpers';
import { useShopStore } from '../../../../services/shop/store';
import { UploadButtonProps } from './types';

export const UploadButton = ({ onDrop, onUploaded, onError, children, icon, size, ...props }: UploadButtonProps) => {
	const shopId = useShopStore((state) => state.shop.id);
	const { getRootProps, getInputProps } = useDropzone({
		...props,
		onDrop: makeOnDrop(shopId, onDrop, onUploaded, onError)
	});

	return (
		<span {...getRootProps()}>
			<input {...getInputProps()} />
			<Button icon={icon} size={size}>
				{children}
			</Button>
		</span>
	);
};
