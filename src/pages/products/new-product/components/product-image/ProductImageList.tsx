import { ComponentProps, FC } from 'react';
import classes from './product-image-list.module.scss';
import { ImageCard } from './ImageCard';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { ProductImageListProps } from './types';
import { useProductImageContext } from './hooks/useProductImageContext';
import { Upload } from '../../../../../components/forms/controls/upload/types';

type DndContextProps = ComponentProps<typeof DndContext>;

export const ProductImageList: FC<ProductImageListProps> = ({ fields, models }) => {
	const { move } = useProductImageContext();
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	);

	if (fields.length === 0) {
		return null;
	}

	const keyModelMap: Record<string, Upload> = {};
	fields.forEach((field) => {
		const model = models.find((m) => m.getKey() === field.id);

		if (!model) {
			return;
		}

		keyModelMap[field.key] = model;
	});

	const sortableItems = Object.keys(keyModelMap);

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
					{fields?.map((field, index) => (
						<ImageCard key={field.key} id={field.key} index={index} model={keyModelMap[field.key]} />
					))}
				</SortableContext>
			</DndContext>
		</div>
	);
};
