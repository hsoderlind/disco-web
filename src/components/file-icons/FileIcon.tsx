import { FC } from 'react';
import type { FileIconProps as ReactFileIconProps } from 'react-file-icon';
import { FileIcon as ReactFileIcon, defaultStyles } from 'react-file-icon';

type Size = {
	small: {
		width: '20px';
	};
	default: {
		width: '40px';
	};
	large: {
		width: '60px';
	};
};
export type FileIconProps = Omit<ReactFileIconProps, 'fold' | 'radius' | 'extension' | 'type'> & {
	extension: string;
	size: keyof Size;
};

const sizes: Size = {
	small: {
		width: '20px'
	},
	default: {
		width: '40px'
	},
	large: {
		width: '60px'
	}
};

export const FileIcon: FC<FileIconProps> = ({ size, extension, ...props }) => {
	if (!(extension in defaultStyles)) {
		extension = 'bin';
	}

	return (
		<div style={sizes[size]}>
			<ReactFileIcon {...props} extension={extension} />
		</div>
	);
};
