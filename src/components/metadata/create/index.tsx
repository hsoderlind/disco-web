import { SubmitHandler } from 'react-hook-form';
import { useForm } from '../../../hooks/useForm';
import app from '../../../lib/application-builder/ApplicationBuilder';
import { ExtractErrors } from '../../../lib/error/ExtractErrors';
import { useCreateMetadata } from '../../../services/metadata/hooks/useCreateMetadata';
import { MetadataSchema, metadataSchema } from '../../../services/metadata/types';
import { MetadataCreateProps } from '../types';
import { Form, Input, Modal } from 'antd';
import FormItem from '../../../lib/form/FormItem';

export const MetadataCreate = ({ open, resource, resourceId, onCancel, onCreated }: MetadataCreateProps) => {
	const {
		control,
		handleSubmit,
		setError,
		formState: { isDirty, isSubmitting }
	} = useForm<MetadataSchema>({
		defaultValues: {
			key: '',
			value: ''
		},
		schema: metadataSchema
	});

	const mutation = useCreateMetadata(resource, resourceId, {
		onSuccess: (metadata) => {
			app.addSuccessNotification({ description: 'Metadatan har nu skapats.' });
			onCreated?.(metadata);
		},
		onError: (error) => {
			app.addErrorNotification({ description: error.message });
			ExtractErrors.fromServerValidationErrorToFormErrors<MetadataSchema>(error)(setError);
		}
	});

	const onSubmit: SubmitHandler<MetadataSchema> = (formValues) => mutation.mutateAsync(formValues);

	return (
		<Modal
			open={open}
			title='Skapa metadata'
			cancelText='Stäng'
			cancelButtonProps={{ disabled: isSubmitting }}
			onCancel={onCancel}
			okText='Spara & stäng'
			okButtonProps={{ disabled: !isDirty, loading: isSubmitting }}
			onOk={handleSubmit(onSubmit)}>
			<Form layout='vertical'>
				<FormItem control={control} name='key' label='Nyckel'>
					<Input />
				</FormItem>
				<FormItem control={control} name='value' label='Värde'>
					<Input />
				</FormItem>
			</Form>
		</Modal>
	);
};
