import { ComponentProps, FC } from 'react';
import classes from './product-image-list.module.scss';
import { ImageCard } from './ImageCard';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { ProductImageListProps } from './types';
import { useProductImageContext } from './hooks/useProductImageContext';

type DndContextProps = ComponentProps<typeof DndContext>;

export const ProductImageList: FC<ProductImageListProps> = ({ models }) => {
	const { move } = useProductImageContext();
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
		<div className={classes['product-image-list']}>
			<DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
				<SortableContext items={sortableItems}>
					{models?.map((model, index) => (
						<ImageCard key={model.getKey()} id={model.getKey()} index={index} model={model} />
					))}
				</SortableContext>
			</DndContext>
		</div>
	);
};
