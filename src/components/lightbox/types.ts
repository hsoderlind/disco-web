export type LightboxImage = {
	mainSrc: string;
	thumbSrc: string;
	description?: string;
}

export type LightboxProps = {
	open?: boolean;
	images: LightboxImage[]
	onClose: () => void;
}
