import { FC } from 'react';
import { useShopStore } from '../../services/shop/store';
import { useForm } from '../../hooks/useForm';
import { CategorySchemaType, categorySchema } from '../../services/category/types';
import { useSearchParams } from 'react-router-dom';
import { useCreateCategory } from '../../services/category/hooks/useCreateCategory';
import { useMutation } from '@tanstack/react-query';
import { Category } from '../../services/category/Category';
import { ServerValidationError } from '../../lib/error/types';
import { ExtractErrors } from '../../lib/error/ExtractErrors';
import { SubmitHandler } from 'react-hook-form';
import { Form, Input, InputNumber, Modal } from 'antd';
import FormItem from '../../lib/form/FormItem';
import app from '../../lib/application-builder/ApplicationBuilder';

export type CreateCategoryModalProps = {
	open: boolean;
	onCancel?: () => void;
	onFinish?: () => void;
};

export const CreateCategoryModal: FC<CreateCategoryModalProps> = ({ open, onCancel, onFinish }) => {
	const shopId = useShopStore((state) => state.shop.id);
	const [searchParams] = useSearchParams();

	const { control, handleSubmit, setError } = useForm<CategorySchemaType>({
		defaultValues: {
			name: '',
			parent: searchParams.has('category') ? parseInt(searchParams.get('category')!) : 0,
			sort_order: 0
		},
		schema: categorySchema
	});

	const [mutationFn] = useCreateCategory(shopId);

	const mutation = useMutation<Category, ServerValidationError, CategorySchemaType>(mutationFn, {
		onSuccess() {
			app.addSuccessNotification({ description: 'Kategorin har nu skapats' });
			onFinish?.();
		},
		onError(error) {
			ExtractErrors.fromServerValidationErrorToFormErrors<CategorySchemaType>(error)(setError);
			app.addErrorNotification({ description: error.message });
		}
	});

	const onSubmit: SubmitHandler<CategorySchemaType> = (values) => {
		mutation.mutate(values);
	};

	return (
		<Modal
			open={open}
			cancelText='Stäng'
			okText='Spara & stäng'
			title='Skapa kategori'
			onCancel={onCancel}
			onOk={handleSubmit(onSubmit)}>
			<Form layout='vertical'>
				<FormItem control={control} name='name' label='Namn'>
					<Input />
				</FormItem>
				<FormItem control={control} name='sort_order' label='Sorteringsordning'>
					<InputNumber min={0} />
				</FormItem>
			</Form>
		</Modal>
	);
};
