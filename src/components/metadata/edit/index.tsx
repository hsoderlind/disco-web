import { SubmitHandler } from 'react-hook-form';
import { useForm } from '../../../hooks/useForm';
import app from '../../../lib/application-builder/ApplicationBuilder';
import { ExtractErrors } from '../../../lib/error/ExtractErrors';
import { useUpdateMetadata } from '../../../services/metadata/hooks/useUpdateMetadata';
import { MetadataSchema, metadataSchema } from '../../../services/metadata/types';
import { MetadataEditProps } from '../types';
import { Form, Input, Modal } from 'antd';
import FormItem from '../../../lib/form/FormItem';

export const MetadataEdit = ({ metadata, open, resource, resourceId, onCancel, onUpdated }: MetadataEditProps) => {
	const {
		control,
		handleSubmit,
		setError,
		formState: { isDirty, isSubmitting }
	} = useForm<MetadataSchema>({
		defaultValues: metadata.toJSON(),
		schema: metadataSchema
	});

	const mutation = useUpdateMetadata(metadata.getKey()!, resource, resourceId, {
		onSuccess: (newMetadata) => {
			app.addSuccessNotification({ description: 'Metadatan har nu uppdaterats.' });
			onUpdated?.(newMetadata);
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
			title={`Redigera: ${metadata.get('key')}`}
			cancelText='Stäng'
			cancelButtonProps={{ disabled: isSubmitting }}
			onCancel={onCancel}
			okText='Spara & stäng'
			okButtonProps={{ disabled: !isDirty, loading: isSubmitting }}
			onOk={handleSubmit(onSubmit)}>
			<Form layout='vertical'>
				<FormItem control={control} name='key' label='Nyckel'>
					<Input readOnly />
				</FormItem>
				<FormItem control={control} name='value' label='Värde'>
					<Input />
				</FormItem>
			</Form>
		</Modal>
	);
};
