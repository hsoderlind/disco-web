import { FC } from 'react';
import { UploadHeroProps } from './types';
import { Upload } from './Upload';
import classes from './upload-hero.module.scss';

export const UploadHero: FC<UploadHeroProps> = ({ icon, infoText, ...props }) => {
	return (
		<div className='mb-input'>
			<div className={classes['upload-hero']}>
				<Upload {...props}>
					<div className={classes['upload-hero__content']}>
						{icon}
						<span className={classes['upload-hero__content__text']}>{infoText}</span>
					</div>
				</Upload>
			</div>
		</div>
	);
};
