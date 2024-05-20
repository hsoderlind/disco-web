import { FC } from 'react';
import { UploadHeroProps } from './types';
import { Upload } from './Upload';
import classes from './upload-hero.module.scss';
import { UploadOutlined } from '@ant-design/icons';

export const UploadHero: FC<UploadHeroProps> = ({
	icon,
	infoText = 'Dra och släpp fil(er) här eller klicka för att ladda upp',
	...props
}) => {
	return (
		<div className='mb-input'>
			<div className={classes['upload-hero']}>
				<Upload {...props}>
					<div className={classes['upload-hero__content']}>
						{icon ?? <UploadOutlined />}
						<span className={classes['upload-hero__content__text']}>{infoText}</span>
					</div>
				</Upload>
			</div>
		</div>
	);
};
