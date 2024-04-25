import classes from './note.module.scss';
import { DeleteOutlined, DragOutlined, MinusOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { CSSProperties, FC, KeyboardEventHandler } from 'react';
import { NoteProps } from './types';
import { usePostItContext } from './usePostItContext';
import { useNote } from './useNote';

export const Note: FC<NoteProps> = ({ id }) => {
	const { remove, update } = usePostItContext();
	const note = useNote(id);

	if (!note) {
		return null;
	}

	const { content, position, color } = note;

	const style: CSSProperties = {
		backgroundColor: color,
		top: position.y,
		left: position.x
	};

	const handleChange: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
		update(id, { content: event.currentTarget.value });
	};

	return (
		<div id={id} role='dialog' className={classes['note']} style={style} tabIndex={0}>
			<div role='toolbar' className={classes['toolbar']}>
				<DragOutlined className={classes['btn']} aria-label='Dra' />
				<div className='flex flex-row column-gap-3'>
					<MinusOutlined
						className={classes['btn']}
						role='button'
						aria-label='Minimera'
						tabIndex={0}
						onClick={() => update(id, { visible: false })}
					/>
					<Popconfirm title='Radera lappen' description='Vill du verkligen radera lappen'>
						<DeleteOutlined
							className={classes['btn']}
							role='button'
							aria-label='Radera'
							tabIndex={0}
							onClick={() => remove(id)}
						/>
					</Popconfirm>
				</div>
			</div>
			<textarea rows={9} onKeyUp={handleChange} value={content}></textarea>
		</div>
	);
};
