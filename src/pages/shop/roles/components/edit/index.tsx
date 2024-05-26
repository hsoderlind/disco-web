import { SubmitHandler } from 'react-hook-form';
import { useForm } from '../../../../../hooks/useForm';
import app from '../../../../../lib/application-builder/ApplicationBuilder';
import { ExtractErrors } from '../../../../../lib/error/ExtractErrors';
import { useUpdateRole } from '../../../../../services/role/hooks/useUpdateRole';
import { RoleSchema, roleSchema } from '../../../../../services/role/ttypes';
import { EditRoleProps } from './types';
import { Form, Input, Modal } from 'antd';
import { FormItem } from 'react-hook-form-antd';

export const EditRole = ({ open, role, onCancel, onUpdated }: EditRoleProps) => {
	const {
		control,
		handleSubmit,
		setError,
		formState: { isDirty, isSubmitting }
	} = useForm<RoleSchema>({
		defaultValues: role,
		schema: roleSchema
	});

	const mutation = useUpdateRole(role.id, {
		onSuccess: (data) => {
			app.addSuccessNotification({ description: 'Rollen har nu uppdaterats' });

			onUpdated?.(data);
		},
		onError: (error) => {
			ExtractErrors.fromServerValidationErrorToFormErrors<RoleSchema>(error)(setError);
		}
	});

	const onSubmit: SubmitHandler<RoleSchema> = (formValues) => mutation.mutateAsync(formValues);

	return (
		<Modal
			open={open}
			title={`Redigera: ${role.name}`}
			okText='Spara & stäng'
			okButtonProps={{ disabled: !isDirty, loading: isSubmitting }}
			onOk={handleSubmit(onSubmit)}
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
