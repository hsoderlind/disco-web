import { FieldArrayWithId, UseFieldArrayRemove } from 'react-hook-form';
import { ProductSchemaType } from '../../../../../services/product/types';
import { FC } from 'react';
import classes from './product-image-list.module.scss';
import { ImageCard } from './ImageCard';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

export type ProductImageListProps = {
	fields: FieldArrayWithId<ProductSchemaType, 'images', 'key'>[];
	remove: UseFieldArrayRemove;
};

export const ProductImageList: FC<ProductImageListProps> = ({ fields, remove }) => {
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

	return (
		<div className={classes['product-image-list']}>
			<DndContext sensors={sensors} collisionDetection={closestCenter}>
				<SortableContext items={sortableItems}>
					{fields?.map((image, index) => <ImageCard key={image.key} index={index} image={image} remove={remove} />)}
				</SortableContext>
			</DndContext>
		</div>
	);
};
