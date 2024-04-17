import { FieldArrayWithId, UseFieldArrayMove, UseFieldArrayRemove } from 'react-hook-form';
import { ProductSchemaType } from '../../../../../services/product/types';
import { ComponentProps, FC } from 'react';
import classes from './product-image-list.module.scss';
import { ImageCard } from './ImageCard';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

type DndContextProps = ComponentProps<typeof DndContext>;

export type ProductImageListProps = {
	fields: FieldArrayWithId<ProductSchemaType, 'images', 'key'>[];
	remove: UseFieldArrayRemove;
	move: UseFieldArrayMove;
};

export const ProductImageList: FC<ProductImageListProps> = ({ fields, remove, move }) => {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	);

	if (fields.length === 0) {
		return null;
	}

	const sortableItems = fields.map((field) => field.key);

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
					{fields?.map((image, index) => <ImageCard key={image.key} index={index} image={image} remove={remove} />)}
				</SortableContext>
			</DndContext>
		</div>
	);
};
