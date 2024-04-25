import { FC } from 'react';
import { DroppableProps } from './types';
import { useDroppable } from '@dnd-kit/core';

export const Droppable: FC<DroppableProps> = ({ children }) => {
	const { setNodeRef } = useDroppable({ id: 'post-it' });

	return (
		<div ref={setNodeRef} style={{ height: '100%' }}>
			{children}
		</div>
	);
};
