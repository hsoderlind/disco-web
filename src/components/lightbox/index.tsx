import { LightboxProps } from './types';
import classes from './lightbox.module.scss';
import { useCallback, useRef, useState } from 'react';
import clsx from 'clsx';
import { Button } from 'antd';
import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';

export const Lightbox = ({ open, images, onClose }: LightboxProps) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	const prev = useCallback(() => activeIndex !== 0 && setActiveIndex(activeIndex - 1), [activeIndex]);
	const next = useCallback(
		() => activeIndex !== images.length - 1 && setActiveIndex(activeIndex + 1),
		[activeIndex, images]
	);
	useKeyboardShortcut(onClose, ['Escape'], undefined, ref?.current);
	useKeyboardShortcut(prev, ['ArrowLeft'], undefined, ref?.current);
	useKeyboardShortcut(next, ['ArrowRight'], undefined, ref?.current);

	if (!open) {
		return null;
	}

	return (
		<div ref={ref} className={classes['lightbox']} tabIndex={0}>
			<div className={classes['image-view']}>
				<Button type='text' icon={<CloseOutlined />} className={classes['close']} onClick={onClose} />
				<div className={classes['content']}>{images.length > 0 ? <img src={images[activeIndex].mainSrc} /> : null}</div>
				<div className={classes['nav']} data-nav='back'>
					<Button size='large' type='text' icon={<LeftOutlined />} disabled={activeIndex === 0} onClick={prev} />
				</div>
				<div className={classes['nav']} data-nav='forward'>
					<Button
						size='large'
						type='text'
						icon={<RightOutlined />}
						disabled={activeIndex === images.length - 1}
						onClick={next}
					/>
				</div>
			</div>
			<ul className={classes['thumbs-list']}>
				{images?.map((image, index) => (
					<li
						key={image.thumbSrc}
						className={clsx(classes['thumb'], { [classes['thumb--active']]: activeIndex === index })}
						onClick={() => setActiveIndex(index)}>
						<img src={image.thumbSrc} />
					</li>
				))}
			</ul>
		</div>
	);
};
