import { Menu, MenuProps, Tooltip } from 'antd';
import { usePostItContext } from './usePostItContext';
import { FileOutlined } from '@ant-design/icons';
import { useMemo } from 'react';

export const PostItButton = () => {
	const { create, notes, update, buttonRef } = usePostItContext();

	const invisibleNotes = useMemo(() => notes?.filter((note) => !note.visible), [notes]);

	const handleClick: MenuProps['onClick'] = (event) => {
		const note = notes!.find((note) => note.key === event.key);

		if (typeof note === 'undefined') {
			console.warn(`No note with key ${event.key}`);
			return;
		}

		update(note._id!, { visible: true });
	};

	const truncateContent = (content: string) => {
		if (content.length > 20) {
			return `${content.substring(0, 20)}...`;
		}

		return content;
	};

	const items: MenuProps['items'] = [
		{
			icon: (
				<Tooltip title='Anteckningar' placement='left'>
					<FileOutlined style={{ rotate: '180deg', fontSize: '24px' }} />
				</Tooltip>
			),
			key: 'notes',
			theme: 'light',
			onTitleClick: create,
			children: invisibleNotes?.map((note, index) => ({
				key: note.key,
				label: note.content ? truncateContent(note.content) : `Lapp ${index + 1}`
			}))
		}
	];

	return <Menu ref={buttonRef} onClick={handleClick} items={items} mode='horizontal' theme='dark' />;
};
