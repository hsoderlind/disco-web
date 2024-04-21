import { FC, ComponentProps } from 'react';
import { ProductFileUploadListProps } from './types';
import { Upload } from '../../../../../components/forms/controls/upload/types';
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import classes from './product-file-upload-list.module.scss';
import { useProductFileUploadContext } from './hooks/useProductFileUploadContext';

type DndContextProps = ComponentProps<typeof DndContext>;

export const ProductFileUploadList: FC<ProductFileUploadListProps> = ({ fields, models }) => {
	const { move } = useProductFileUploadContext();
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
		<div className={classes['product-file-upload-list']}>
			<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
				<SortableContext items={sortableItems} strategy={verticalListSortingStrategy}>
					{fields.map((field, index) => (
						<SortableItem key={field.key} id={field.key} index={index} model={keyModelMap[field.key]} />
					))}
				</SortableContext>
			</DndContext>
		</div>
	);
};
