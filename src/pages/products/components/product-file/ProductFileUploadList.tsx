import { useMemo, useCallback } from 'react';
import {
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import classes from './product-file-upload-list.module.scss';
import { useProductFileUploadContext } from './hooks/useProductFileUploadContext';
import { useFormContext, useWatch } from 'react-hook-form';
import { ProductSchemaType } from '../../../../services/product/types';

export const ProductFileUploadList = () => {
	const { control } = useFormContext<ProductSchemaType>();
	const models = useWatch({ control, name: 'files' });
	const { move } = useProductFileUploadContext();
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	);

	const sortableItems = useMemo(() => (!models ? [] : models.map((model) => model.getKey())), [models]);

	const handleDragEnd = useCallback(
		(event: DragEndEvent) => {
			const { active, over } = event;

			if (!over) {
				return;
			}

			const fromIndex = sortableItems.findIndex((id) => active.id === id);
			const toIndex = sortableItems.findIndex((id) => over.id === id);
			move(fromIndex, toIndex);
		},
		[move, sortableItems]
	);

	if (!models || models.length === 0) {
		return null;
	}

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
