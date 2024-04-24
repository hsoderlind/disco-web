import classes from './note.module.scss';
import { DeleteOutlined, DragOutlined, MinusOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';

export const Note = () => {
	return (
		<div role='dialog' className={classes['note']} tabIndex={0}>
			<div role='toolbar' className={classes['toolbar']}>
				<DragOutlined className={classes['btn']} aria-label='Dra' />
				<div className='flex flex-row column-gap-3'>
					<MinusOutlined className={classes['btn']} role='button' aria-label='Minimera' tabIndex={0} />
					<Popconfirm title='Radera lappen' description='Vill du verkligen radera lappen'>
						<DeleteOutlined className={classes['btn']} role='button' aria-label='Radera' tabIndex={0} />
					</Popconfirm>
				</div>
			</div>
			<textarea rows={9}></textarea>
		</div>
	);
};
