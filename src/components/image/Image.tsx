import { FC } from 'react';
import { ImageProps } from './types';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from 'antd';
import { ExclamationOutlined } from '@ant-design/icons';
import { ImageLoader } from './ImageLoader';

export const Image: FC<ImageProps> = ({ fallback, key, loading, src, className, width }) => {
	const { data, isLoading, isError } = useQuery([key], src);

	const commonProps = {
		className,
		style: { width }
	};

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

	return <img src={data} {...commonProps} />;
};
