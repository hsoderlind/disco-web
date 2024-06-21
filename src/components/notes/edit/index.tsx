import { SubmitHandler } from 'react-hook-form';
import { useForm } from '../../../hooks/useForm';
import app from '../../../lib/application-builder/ApplicationBuilder';
import { ExtractErrors } from '../../../lib/error/ExtractErrors';
import { useUpdateNote } from '../../../services/note/hooks/useUpdateNote';
import { NoteSchema, noteSchema } from '../../../services/note/types';
import { NoteEditProps } from './types';
import { Form, Input, Modal } from 'antd';
import FormItem from '../../../lib/form/FormItem';

export const NoteEdit = ({ note, open, onCancel, onUpdated, resource, resourceId }: NoteEditProps) => {
	const id = note.getKey()!;

	const {
		control,
		handleSubmit,
		setError,
		formState: { isDirty, isSubmitting }
	} = useForm<NoteSchema>({
		defaultValues: note.toJSON(),
		schema: noteSchema
	});

	const mutation = useUpdateNote(id, resource, resourceId, {
		onSuccess: (note) => {
			app.addSuccessNotification({ description: 'Anteckningen har nu uppdaterats' });
			onUpdated?.(note);
		},
		onError: (error) => {
			app.addErrorNotification({ description: error.message });
			ExtractErrors.fromServerValidationErrorToFormErrors<NoteSchema>(error)(setError);
		}
	});

	const onSubmit: SubmitHandler<NoteSchema> = (formValues) => mutation.mutateAsync(formValues);

	return (
		<Modal
			open={open}
			title={`Redigera: ${note.get('title')}`}
			onCancel={onCancel}
			onOk={handleSubmit(onSubmit)}
			cancelText='Stäng'
			okText='Spara & stäng'
			okButtonProps={{ disabled: !isDirty, loading: isSubmitting }}
			cancelButtonProps={{ disabled: isSubmitting }}>
			<Form layout='vertical'>
				<FormItem control={control} name='title' label='Titel'>
					<Input />
				</FormItem>
				<FormItem control={control} name='content' label='Innehåll'>
					<Input.TextArea rows={6} />
				</FormItem>
			</Form>
		</Modal>
	);
};
