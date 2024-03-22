import { FC } from 'react';
import { Category } from '../../services/category/Category';
import { useForm } from '../../hooks/useForm';
import { CategorySchemaType, categorySchema } from '../../services/category/types';
import { useUpdateCategory } from '../../services/category/hooks/useUpdateCategory';
import { useMutation } from '@tanstack/react-query';
import { ServerValidationError } from '../../lib/error/types';
import { ExtractErrors } from '../../lib/error/ExtractErrors';
import { SubmitHandler } from 'react-hook-form';
import { Form, Input, InputNumber, Modal } from 'antd';
import FormItem from '../../lib/form/FormItem';
import app from '../../lib/application-builder/ApplicationBuilder';

export type EditCategoryModalProps = {
	category: Category;
	open: boolean;
	onCancel?: () => void;
	onFinish?: () => void;
};

export const EditCategoryModal: FC<EditCategoryModalProps> = ({ category, open, onCancel, onFinish }) => {
	const { control, handleSubmit, setError } = useForm<CategorySchemaType>({
		defaultValues: {
			name: category.get<string>('name'),
			parent: category.get<number>('parent'),
			sort_order: category.get<number>('sort_order')
		},
		schema: categorySchema
	});

	const [mutationFn] = useUpdateCategory(category);

	const mutation = useMutation<Category, ServerValidationError, CategorySchemaType>(mutationFn, {
		onSuccess() {
			app.addSuccessNoitication({ description: 'Kategorin har nu uppdaterats.' });
			onFinish?.();
		},
		onError(error) {
			ExtractErrors.fromServerValidationErrorToFormErrors<CategorySchemaType>(error)(setError);
			app.addErrorNoitication({ description: error.message });
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
			title={`Uppdatera ${category.get<string>('name')}`}
			onCancel={onCancel}
			onOk={handleSubmit(onSubmit)}>
			<Form layout='vertical'>
				<FormItem control={control} name='name' label='Namn'>
					<Input />
				</FormItem>
				<FormItem control={control} name='sort_order' label='Sorteringsordning'>
					<InputNumber />
				</FormItem>
			</Form>
		</Modal>
	);
};
