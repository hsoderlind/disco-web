import classes from './note.module.scss';
import { DeleteOutlined, DragOutlined, MinusOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { CSSProperties, FC, MouseEventHandler, createRef, useRef, useState } from 'react';
import { NoteProps } from './types';
import { usePostItContext } from './usePostItContext';
import { useNote } from './useNote';
import clsx from 'clsx';
import { useDraggable } from '@dnd-kit/core';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';

export const Note: FC<NoteProps> = ({ id }) => {
	const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform } = useDraggable({ id });
	const dialogRef = useRef<HTMLDivElement | null>(null);
	const [fadeout, setFadeOut] = useState(false);
	const [drop, setDrop] = useState(false);
	const textAreaRef = createRef<HTMLTextAreaElement>();
	const { remove, update } = usePostItContext();
	const note = useNote(id);

	const { content, position, color } = note;

	const style: CSSProperties = {
		backgroundColor: color,
		top: `${position.y + (transform?.y ?? 0)}px`,
		left: `${position.x + (transform?.x ?? 0)}px`
	};

	const handleMinimize: MouseEventHandler<HTMLSpanElement> = () => {
		const content = textAreaRef?.current?.value;
		setFadeOut(true);
		setTimeout(() => {
			update(id, { visible: false, content });
		}, 300);
	};

	const handleDelete = () => {
		setTimeout(() => setDrop(true), 200);
		setTimeout(() => remove(id), 700);
	};

	useKeyboardShortcut(handleMinimize, ['Escape'], undefined, dialogRef?.current);
	useKeyboardShortcut(handleDelete, ['D'], 'shiftKey', dialogRef?.current);

	return (
		<div
			// ref={setNodeRef}
			ref={(ref) => {
				setNodeRef(ref);
				dialogRef.current = ref;
			}}
			role='dialog'
			aria-roledescription='dragbar dialog'
			tabIndex={0}
			id={id}
			className={clsx(classes['note'], { [classes['note--fadeout']]: fadeout, [classes['note--drop']]: drop })}
			style={style}>
			<div role='toolbar' className={classes['toolbar']}>
				<DragOutlined
					ref={setActivatorNodeRef}
					className={classes['btn']}
					aria-label='Dra'
					{...attributes}
					{...listeners}
				/>
				<div className='flex flex-row column-gap-3'>
					<MinusOutlined
						className={classes['btn']}
						role='button'
						aria-label='Minimera'
						tabIndex={0}
						onClick={handleMinimize}
					/>
					<Popconfirm title='Radera lappen' description='Vill du verkligen radera lappen' onConfirm={handleDelete}>
						<DeleteOutlined className={classes['btn']} role='button' aria-label='Radera' tabIndex={0} />
					</Popconfirm>
				</div>
			</div>
			<textarea ref={textAreaRef} rows={9}>
				{content}
			</textarea>
		</div>
	);
};
