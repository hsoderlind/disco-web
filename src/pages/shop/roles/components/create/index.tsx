import { SubmitHandler } from 'react-hook-form';
import { useForm } from '../../../../../hooks/useForm';
import app from '../../../../../lib/application-builder/ApplicationBuilder';
import { ExtractErrors } from '../../../../../lib/error/ExtractErrors';
import { useCreateRole } from '../../../../../services/role/hooks/useCreateRole';
import { RoleSchema, roleSchema } from '../../../../../services/role/ttypes';
import { CreateRoleProps } from './types';
import { Form, Input, Modal } from 'antd';
import { FormItem } from 'react-hook-form-antd';

export const CreateRole = ({ onCancel, onCreated, open }: CreateRoleProps) => {
	const {
		control,
		handleSubmit,
		setError,
		formState: { isDirty, isSubmitting }
	} = useForm<RoleSchema>({
		defaultValues: {
			name: ''
		},
		schema: roleSchema
	});

	const mutation = useCreateRole({
		onSuccess: (role) => {
			app.addSuccessNotification({ description: 'Rollen har nu skapats.' });
			onCreated?.(role);
		},
		onError: (error) => {
			ExtractErrors.fromServerValidationErrorToFormErrors<RoleSchema>(error)(setError);
		}
	});

	const onSubmit: SubmitHandler<RoleSchema> = (formValues) => mutation.mutateAsync(formValues);

	return (
		<Modal
			title='Lägg till roll'
			open={open}
			okText='Spara & stäng'
			onOk={handleSubmit(onSubmit)}
			okButtonProps={{ disabled: !isDirty, loading: isSubmitting }}
			cancelText='Avbryt'
			onCancel={onCancel}
			cancelButtonProps={{ disabled: isSubmitting }}>
			<Form layout='vertical'>
				<FormItem control={control} name='name' label='Namn'>
					<Input />
				</FormItem>
			</Form>
		</Modal>
	);
};
