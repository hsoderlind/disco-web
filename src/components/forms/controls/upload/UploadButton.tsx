import { useDropzone } from 'react-dropzone';
import { ComponentProps } from 'react';
import { Button } from 'antd';
import { CommonUploadProps } from './types';
import { makeOnDrop, makeOnDropAccepted } from './helpers';
import { useShopStore } from '../../../../services/shop/store';

type ButtonProps = ComponentProps<typeof Button>;

export type UploadButtonProps = CommonUploadProps & {
	children?: ButtonProps['children'];
	icon?: ButtonProps['icon'];
	size?: ButtonProps['size'];
};

export const UploadButton = ({
	onDrop,
	onUploaded,
	onRejection,
	children,
	icon,
	size,
	...props
}: UploadButtonProps) => {
	const shopId = useShopStore((state) => state.shop.id);
	const { open, getRootProps, getInputProps } = useDropzone({
		...props,
		onDrop: makeOnDrop(shopId, onDrop, onUploaded, onRejection),
		onDropAccepted: makeOnDropAccepted(shopId, onDrop, onUploaded)
	});

	return (
		<span {...getRootProps()}>
			<input {...getInputProps()} />
			<Button icon={icon} size={size} onClick={open}>
				{children}
			</Button>
		</span>
	);
};
