import { SubmitHandler } from 'react-hook-form';
import { useForm } from '../../../hooks/useForm';
import { useCreateNote } from '../../../services/note/hooks/useCreateNote';
import { NoteSchema, noteSchema } from '../../../services/note/types';
import { NoteCreateProps } from './types';
import app from '../../../lib/application-builder/ApplicationBuilder';
import { ExtractErrors } from '../../../lib/error/ExtractErrors';
import { Form, Input, Modal } from 'antd';
import FormItem from '../../../lib/form/FormItem';

export const NoteCreate = ({ open, onCancel, onCreated, resource, resourceId }: NoteCreateProps) => {
	const {
		control,
		handleSubmit,
		setError,
		formState: { isDirty, isSubmitting }
	} = useForm<NoteSchema>({
		defaultValues: {
			title: '',
			content: ''
		},
		schema: noteSchema
	});

	const mutation = useCreateNote(resource, resourceId!, {
		onSuccess: (note) => {
			app.addSuccessNotification({ description: 'Anteckningen har nu skapats.' });
			onCreated?.(note);
		},
		onError: (error) => {
			ExtractErrors.fromServerValidationErrorToFormErrors<NoteSchema>(error)(setError);
			app.addInfoNotification({ description: error.message });
		}
	});

	const onSubmit: SubmitHandler<NoteSchema> = (formValues) => mutation.mutateAsync(formValues);

	return (
		<Modal
			open={open}
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
