import { FC, ComponentProps } from 'react';
import { ProductFileUploadListProps } from './types';
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import classes from './product-file-upload-list.module.scss';
import { useProductFileUploadContext } from './hooks/useProductFileUploadContext';

type DndContextProps = ComponentProps<typeof DndContext>;

export const ProductFileUploadList: FC<ProductFileUploadListProps> = ({ models }) => {
	const { move } = useProductFileUploadContext();
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	);

	if (models.length === 0) {
		return null;
	}

	const sortableItems = models.map((model) => model.getKey());

	const handleDragEnd: DndContextProps['onDragEnd'] = (event) => {
		const { active, over } = event;

		if (!over) {
			return;
		}

		const fromIndex = sortableItems.findIndex((id) => active.id === id);
		const toIndex = sortableItems.findIndex((id) => over.id === id);
		move(fromIndex, toIndex);
	};

	return (
		<div className={classes['product-file-upload-list']}>
			<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
				<SortableContext items={sortableItems} strategy={verticalListSortingStrategy}>
					{models.map((model, index) => (
						<SortableItem key={model.getKey()} id={model.getKey()} index={index} model={model} />
					))}
				</SortableContext>
			</DndContext>
		</div>
	);
};
