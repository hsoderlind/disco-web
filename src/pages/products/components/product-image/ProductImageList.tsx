import { ComponentProps, FC, useEffect } from 'react';
import classes from './product-image-list.module.scss';
import { ImageCard } from './ImageCard';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { ProductImageListProps } from './types';
import { useProductImageContext } from './hooks/useProductImageContext';
import { useFormContext } from 'react-hook-form';
import { ProductSchemaType } from '../../../../services/product/types';
import { useProductImageStore } from './store';
import { Upload } from '../../../../components/forms/controls/upload/types';
import { useShopStore } from '../../../../services/shop/store';
import { File } from '../../../../services/file/File';

type DndContextProps = ComponentProps<typeof DndContext>;

export const ProductImageList: FC<ProductImageListProps> = ({ models }) => {
	const shopId = useShopStore((state) => state.shop.id);
	const store = useProductImageStore();
	const { getValues } = useFormContext<ProductSchemaType>();
	const { move } = useProductImageContext();
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	);

	const images = getValues('images');

	useEffect(() => {
		if (images?.length) {
			images.forEach((image) => {
				const model = new Upload(
					{
						...image,
						key: `upload-${image.id}`,
						model: new File(image.meta, shopId)
					},
					shopId
				);
				model.set('isUploaded', true);
				model.set('uploadProgress', 100);
				store.add(model);
			});
		}
	}, [images, shopId]);

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
