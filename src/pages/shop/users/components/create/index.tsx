import { Form, Input, Modal } from 'antd';
import { useForm } from '../../../../../hooks/useForm';
import { ShopUserSchema, shopUserSchema } from '../../../../../services/shop/types';
import { CreateShopUserProps } from './types';
import { useCreateShopUser } from '../../../../../services/shop/hooks/useCreateShopUser';
import app from '../../../../../lib/application-builder/ApplicationBuilder';
import { ExtractErrors } from '../../../../../lib/error/ExtractErrors';
import { SubmitHandler } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { RoleSelect } from '../../../../../components/forms/controls/role-select';

export const CreateShopUser = ({ open, onCancel, onCreated }: CreateShopUserProps) => {
	const {
		control,
		handleSubmit,
		setError,
		formState: { isDirty, isSubmitting }
	} = useForm<ShopUserSchema>({
		defaultValues: {
			name: '',
			email: '',
			roles: []
		},
		schema: shopUserSchema
	});

	const mutation = useCreateShopUser({
		onSuccess: (shopUser) => {
			app.addSuccessNotification({ description: 'Användaren har nu lagts till.' });
			onCreated?.(shopUser);
		},
		onError: (error) => {
			app.addErrorNotification({ description: error.message });
			ExtractErrors.fromServerValidationErrorToFormErrors<ShopUserSchema>(error)(setError);
		}
	});

	const onSubmit: SubmitHandler<ShopUserSchema> = (formValues) => mutation.mutateAsync(formValues);

	return (
		<Modal
			open={open}
			okText='Spara & stäng'
			onOk={handleSubmit(onSubmit)}
			okButtonProps={{ disabled: !isDirty, loading: isSubmitting }}
			cancelText='Stäng'
			onCancel={onCancel}
			cancelButtonProps={{ disabled: isSubmitting }}
			title='Lägg till användare'>
			<Form layout='vertical'>
				<FormItem control={control} name='name' label='Namn'>
					<Input />
				</FormItem>
				<FormItem control={control} name='email' label='E-post'>
					<Input type='email' />
				</FormItem>
				<FormItem control={control} name='roles' label='Roll(er)'>
					<RoleSelect mode='multiple' allowClear />
				</FormItem>
			</Form>
		</Modal>
	);
};
