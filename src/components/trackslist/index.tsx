import { TrackslistProps } from './types';
import classes from './trackslist.module.scss';

export const Trackslist = ({ title, tracks }: TrackslistProps) => {
	return (
		<section className={classes['trackslist']}>
			<h3 className={classes['trackslist__title']}>{title}</h3>
			<div className={classes['trackslist__tracks']}>
				{tracks.map((track) => (
					<div className={classes['track']}>
						<div>
							{track.position}. {track.title}
						</div>
						<div>{track.duration}</div>
					</div>
				))}
			</div>
		</section>
	);
};
