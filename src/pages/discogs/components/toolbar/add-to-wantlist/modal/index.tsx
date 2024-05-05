import { Form, Input, Modal, Rate } from 'antd';
import { useForm } from '../../../../../../hooks/useForm';
import {
	AddToWantListRequestSchema,
	addToWantListRequestSchema
} from '../../../../../../services/discogs/wantlist/types';
import { AddToWantlistModalProps } from '../types';
import { useAddToWantlist } from '../../../../../../services/discogs/wantlist/hooks/useAddToWantlist';
import { SubmitHandler } from 'react-hook-form';
import { ServerValidationError } from '../../../../../../lib/error/types';
import { ExtractErrors } from '../../../../../../lib/error/ExtractErrors';
import FormItem from '../../../../../../lib/form/FormItem';

export const AddToWantlistModal = ({ onCancel, open, onFinish, releaseId }: AddToWantlistModalProps) => {
	const { control, setError, handleSubmit } = useForm<AddToWantListRequestSchema>({
		defaultValues: {
			release_id: releaseId,
			notes: '',
			rating: 0
		},
		schema: addToWantListRequestSchema
	});
	const mutation = useAddToWantlist();

	const onSubmit: SubmitHandler<AddToWantListRequestSchema> = (values) => {
		return mutation.mutateAsync(values, {
			onError: (error) => {
				ExtractErrors.fromServerValidationErrorToFormErrors<AddToWantListRequestSchema>(error as ServerValidationError)(
					setError
				);
			},
			onSuccess: (model) => onFinish?.(model!)
		});
	};

	return (
		<Modal
			open={open}
			title='Lägg till i önskelistan'
			cancelText='Avbryt'
			okText='Lägg till'
			onCancel={onCancel}
			onOk={handleSubmit(onSubmit)}>
			<Form layout='vertical'>
				<FormItem control={control} name='notes' label='Anteckningar'>
					<Input.TextArea rows={4} />
				</FormItem>
				<FormItem control={control} name='rating' label='Betyg'>
					<Rate />
				</FormItem>
			</Form>
		</Modal>
	);
};
