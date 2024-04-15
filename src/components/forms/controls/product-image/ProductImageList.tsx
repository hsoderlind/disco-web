import { Control, useFieldArray } from 'react-hook-form';
import { ProductSchemaType } from '../../../../services/product/types';
import { FC, useCallback } from 'react';
import { Button, Image, InputNumber, Popconfirm, Switch } from 'antd';
import { useShopStore } from '../../../../services/shop/store';
import { ProductImage } from '../../../../services/product-image/ProductImage';
import { Num } from '../../../../lib/number/Num';
import classes from './product-image-list.module.scss';
import FormItem from '../../../../lib/form/FormItem';
import { DragDropContext, Draggable, OnDragEndResponder } from 'react-beautiful-dnd';
import { StrictModeDroppable } from '../../../dnd/StrictModeDroppable';
import { CheckOutlined, CloseOutlined, DeleteOutlined, DragOutlined } from '@ant-design/icons';
import { useDeleteProductImage } from '../../../../services/product-image/hooks/useDeleteProductImage';

export type ProductImageListProps = {
	control: Control<ProductSchemaType>;
	disabled?: boolean;
	readOnly?: boolean;
};

export const ProductImageList: FC<ProductImageListProps> = ({ control, disabled = false, readOnly = false }) => {
	const shopId = useShopStore((state) => state.shop.id);
	const deleteImage = useDeleteProductImage();
	const { fields, remove, move } = useFieldArray({ control, name: 'images' });

	const onDragEnd = useCallback<OnDragEndResponder>(
		(result) => {
			const { destination, source } = result;

			if (!destination) {
				return;
			}

			if (destination.droppableId === source.droppableId && destination.index === source.index) {
				return;
			}

			move(source.index, destination.index);
		},
		[move]
	);

	if (fields.length === 0) {
		return null;
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<StrictModeDroppable droppableId='product-image-list'>
				{(provided) => (
					<div className={classes['product-image-list']} ref={provided.innerRef} {...provided.droppableProps}>
						{fields?.map((productImage, index) => (
							<Draggable draggableId={productImage.key} index={index} key={productImage.key}>
								{(draggableProvided) => {
									const model = new ProductImage({ id: parseInt(productImage.key.substring(3)) }, shopId);
									return (
										<div
											ref={draggableProvided.innerRef}
											{...draggableProvided.draggableProps}
											className={classes['product-image-list__item']}
											key={productImage.key}>
											<div className='product-image-list__draghandle-col' {...draggableProvided.dragHandleProps}>
												<DragOutlined />
											</div>
											<div className={classes['product-image-list__img-col']}>
												<Image
													src={model?.download()}
													width={75}
													className={classes['product-image-list__img-col__img']}
												/>
											</div>
											<div className={classes['product-image-list__filename-col']}>{productImage.meta.filename}</div>
											<div className='product-image-list__size'>{Num.formatBytes(productImage.meta.size)}</div>
											{!readOnly && (
												<>
													<div className={classes['product-image-list__sort-order-col']}>
														<FormItem control={control} name={`images.${index}.sort_order`}>
															<InputNumber min={0} disabled={disabled} />
														</FormItem>
													</div>
													<div className={classes['product-image-list__use-as-cover-col']}>
														<FormItem control={control} name={`images.${index}.use_as_cover`} valuePropName='checked'>
															<Switch
																checkedChildren={<CheckOutlined />}
																unCheckedChildren={<CloseOutlined />}
																disabled={disabled}
															/>
														</FormItem>
													</div>
													<div className='product-image-list__delete-col'>
														<Popconfirm
															title='Radera bilder'
															description={
																<>
																	Är du säker på att du vill radera bilden?
																	<br />
																	Bilden kommer raderas permanent och det går inte att ångra åtgärden.
																</>
															}
															onConfirm={() => deleteImage(model!, () => remove(index))}
															okText='Ja'
															cancelText='Nej'>
															<Button danger icon={<DeleteOutlined />} disabled={disabled} />
														</Popconfirm>
													</div>
												</>
											)}
										</div>
									);
								}}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</StrictModeDroppable>
		</DragDropContext>
	);
};
