import { FC } from 'react';
import { SortableItemProps } from './types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ProductFileUploadListItem } from './ProductFileUploadListItem';

export const SortableItem: FC<SortableItemProps> = ({ id, ...props }) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	};

	return (
		<ProductFileUploadListItem
			ref={setNodeRef}
			attributes={attributes}
			listeners={listeners}
			style={style}
			{...props}
		/>
	);
};
