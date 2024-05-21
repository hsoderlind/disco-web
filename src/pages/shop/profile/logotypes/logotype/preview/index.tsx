import { useState } from 'react';
import { File } from '../../../../../../services/file/File';
import { LogotypePreviewProps } from '../../types';
import { Image } from '../../../../../../components/image/Image';
import { Card, Progress } from 'antd';
import classes from './preview.module.scss';
import { DeleteOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { IoColorFill, IoColorFillOutline } from 'react-icons/io5';

export const LogotypePreview = ({ file, index, remove }: LogotypePreviewProps) => {
	const [filledBG, setFilledBg] = useState(false);
	const [invertBg, setInvertBg] = useState(false);
	const [progress, setProgress] = useState(file.get<number>('uploadProgress'));
	const [isUploaded, setIsUploaded] = useState(file.get<boolean>('isUploaded'));

	file.getUploadProgress(setProgress);
	file.checkIsUploaded((uploaded) => uploaded && setIsUploaded(true));

	return (
		<Card
			cover={
				<div
					className={clsx(classes['preview'], {
						[classes['preview--invert']]: invertBg,
						[classes['preview--fill']]: filledBG
					})}>
					<Image
						src={() => file.get<File>('model').download()}
						queryKey={file.get<File>('model').get('id')}
						downloadingIsDisabled={!isUploaded}
						maxWidthIsNaturalWidth
					/>
				</div>
			}
			actions={[
				filledBG ? (
					<IoColorFillOutline style={{ fontSize: '1.25rem' }} onClick={() => setFilledBg(false)} />
				) : (
					<IoColorFill style={{ fontSize: '1.25rem' }} onClick={() => setFilledBg(true)} />
				),
				invertBg ? (
					<SunOutlined style={{ fontSize: '1.25rem' }} onClick={() => setInvertBg(false)} />
				) : (
					<MoonOutlined style={{ fontSize: '1.25rem' }} onClick={() => setInvertBg(true)} />
				),
				<DeleteOutlined style={{ fontSize: '1.25rem' }} onClick={() => remove(index)} />
			]}>
			<Progress percent={progress} />
		</Card>
	);
};
