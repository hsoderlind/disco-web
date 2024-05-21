import { FC } from 'react';
import { ImageProps } from './types';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from 'antd';
import { ExclamationOutlined } from '@ant-design/icons';
import { ImageLoader } from './ImageLoader';

export const Image: FC<ImageProps> = ({
	fallback,
	queryKey,
	loading,
	src,
	className,
	width,
	downloadingIsDisabled = false,
	maxWidthIsNaturalWidth = false
}) => {
	const { data, isLoading, isError } = useQuery([queryKey], src, { enabled: !downloadingIsDisabled });

	const commonProps = {
		className,
		style: { width }
	};

	if (downloadingIsDisabled) {
		return <ImageLoader active {...commonProps} />;
	}

	if (isLoading && typeof loading !== 'undefined') {
		return typeof loading === 'function' ? loading() : loading;
	} else if (isLoading && typeof loading === 'undefined') {
		return <ImageLoader active {...commonProps} />;
	}

	if (isError && typeof fallback !== 'undefined') {
		return typeof fallback === 'function' ? fallback() : fallback;
	} else if (isError && typeof fallback === 'undefined') {
		return (
			<Skeleton.Node>
				<ExclamationOutlined />
			</Skeleton.Node>
		);
	}

	return (
		<img
			ref={(el) => {
				if (el && el.naturalWidth && maxWidthIsNaturalWidth) {
					el.style.maxWidth = el?.naturalWidth ? `${el.naturalWidth}px` : '100%';
				}
			}}
			src={data}
			{...commonProps}
		/>
	);
};
