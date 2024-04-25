import { Menu, MenuProps } from 'antd';
import { usePostItContext } from './usePostItContext';
import { FileOutlined } from '@ant-design/icons';
import { useMemo } from 'react';

export const PostItButton = () => {
	const { create, notes, update, buttonRef } = usePostItContext();

	const invisibleNotes = useMemo(() => notes.filter((note) => !note.visible), [notes]);

	const handleClick: MenuProps['onClick'] = (event) => {
		update(event.key, { visible: true });
		return false;
	};

	const truncateContent = (content: string) => {
		if (content.length > 20) {
			return `${content.substring(0, 20)}...`;
		}

		return content;
	};

	const items: MenuProps['items'] = [
		{
			icon: <FileOutlined style={{ rotate: '180deg', fontSize: '24px' }} />,
			key: 'notes',
			theme: 'light',
			onTitleClick: create,
			children: invisibleNotes.map((note, index) => ({
				key: note.id,
				label: note.content ? truncateContent(note.content) : `Lapp ${index + 1}`
			}))
		}
	];

	return <Menu ref={buttonRef} onClick={handleClick} items={items} mode='horizontal' theme='dark' />;
};
