import clsx from 'clsx';
import { FC, ReactNode, useState } from 'react';
import classes from './sass/ExpandableControl.module.scss';
console.log('classes', classes);

type ExpandFn = () => void;
type ShrinkFn = () => void;
type ToggleFn = () => void;
type VisibleContentFn = (toggle: ToggleFn, expand: ExpandFn, shrink: ShrinkFn) => ReactNode;

export type ExpandableControlProps = {
	renddervVisibleContent: VisibleContentFn;
	renderExpandableContent: ReactNode | (() => ReactNode);
	defaultExpanded?: boolean;
};

export const ExpandableControl: FC<ExpandableControlProps> = ({
	renddervVisibleContent,
	renderExpandableContent,
	defaultExpanded = false
}) => {
	const [expanded, setExpanded] = useState(defaultExpanded);

	const toggle = () => setExpanded(() => !expanded);
	const expand = () => setExpanded(() => true);
	const shrink = () => setExpanded(() => false);

	return (
		<div className={classes['expandable-control']}>
			<div className='expandable-control__static-content'>{renddervVisibleContent(toggle, expand, shrink)}</div>
			<div
				className={clsx(classes['expandable-control__expandable-content'], {
					[classes['expandable-control__expandable-content--expanded']]: expanded
				})}>
				<div className={classes['expandable-control__controls']}>
					{typeof renderExpandableContent === 'function' ? renderExpandableContent() : renderExpandableContent}
				</div>
			</div>
		</div>
	);
};
