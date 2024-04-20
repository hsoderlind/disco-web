import { CSSProperties, ReactNode } from "react";

export type FallbackType = ReactNode | (() => ReactNode);

export type SrcType = () => Promise<string | undefined>;

export type LoadingType = ReactNode | (() => ReactNode);

export type ImageProps = {
	loading?: LoadingType;
	fallback?: FallbackType;
	src: SrcType;
	className?: string;
	width?: CSSProperties['width'];
	key: string;
};

export type ImageLoaderProps = {
	className?: string;
	style: CSSProperties;
	active?: boolean;
}
