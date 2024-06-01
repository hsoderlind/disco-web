import { useCallback, useMemo } from 'react';
import classes from './product-image-list.module.scss';
import { ImageCard } from './ImageCard';
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useProductImageContext } from './hooks/useProductImageContext';
import { useFormContext, useWatch } from 'react-hook-form';
import { ProductSchemaType } from '../../../../services/product/types';

export const ProductImageList = () => {
	const { control } = useFormContext<ProductSchemaType>();
	const models = useWatch({ control, name: 'images' });
	const { move } = useProductImageContext();
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	);

	const sortableItems = useMemo(() => models?.map((model) => model.getKey()), [models]);

	const handleDragEnd = useCallback(
		(event: DragEndEvent) => {
			const { active, over } = event;

			if (!over) {
				return;
			}

			const fromIndex = sortableItems?.findIndex((id) => active.id === id);
			const toIndex = sortableItems?.findIndex((id) => over.id === id);

			if (typeof fromIndex === 'number' && typeof toIndex === 'number') {
				move(fromIndex, toIndex);
			}
		},
		[move, sortableItems]
	);

	if (!models || models.length === 0) {
		return null;
	}

	return (
		<div className={classes['product-image-list']}>
			<DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
				<SortableContext items={sortableItems!}>
					{models?.map((model, index) => (
						<ImageCard key={model.getKey()} id={model.getKey()} index={index} model={model} />
					))}
				</SortableContext>
			</DndContext>
		</div>
	);
};
