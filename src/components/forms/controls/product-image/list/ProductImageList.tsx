import { Control, useFieldArray } from 'react-hook-form';
import { ProductSchemaType } from '../../../../../services/product/types';
import { FC } from 'react';
import classes from './product-image-list.module.scss';
import { ImageCard } from './ImageCard';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

export type ProductImageListProps = {
	control: Control<ProductSchemaType>;
};

export const ProductImageList: FC<ProductImageListProps> = ({ control }) => {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	);
	const { fields, remove, move } = useFieldArray({ control, name: 'images' });
	console.log('move', move);

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
