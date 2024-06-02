import { FC } from 'react';
import { UploadHeroProps } from './types';
import { Upload } from './Upload';
import classes from './upload-hero.module.scss';
import { UploadOutlined } from '@ant-design/icons';
import clsx from 'clsx';

export const UploadHero: FC<UploadHeroProps> = ({
	icon,
	error,
	infoText = 'Dra och släpp fil(er) här eller klicka för att ladda upp',
	...props
}) => {
	return (
		<div className='mb-input'>
			<div className={clsx(classes['upload-hero'], { [classes['upload-hero--error']]: !!error })}>
				<Upload {...props}>
					<div className={classes['upload-hero__content']}>
						{icon ?? <UploadOutlined />}
						<span className={classes['upload-hero__content__text']}>{infoText}</span>
					</div>
				</Upload>
			</div>
			{!!error && (
				<span className={classes['upload-hero__error-message']}>
					{(Array.isArray(error) ? error[0] : error).message}
				</span>
			)}
		</div>
	);
};
