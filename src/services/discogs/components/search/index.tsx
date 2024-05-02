import { Input, Modal } from 'antd';
import { useForm } from '../../../../hooks/useForm';
import { SearchSchema, searchSchema } from '../../search/types';
import { useSearch } from '../../search/hooks/useSearch';
import { useMutation } from '@tanstack/react-query';
import { ServerValidationError } from '../../../../lib/error/types';
import { SearchModalProps } from './type';
import { ExtractErrors } from '../../../../lib/error/ExtractErrors';
import { SubmitHandler } from 'react-hook-form';
import FormItem from '../../../../lib/form/FormItem';

export const SearchModal = ({ open, onResult, onError, onCancel }: SearchModalProps) => {
	const { control, setError, handleSubmit, reset } = useForm<SearchSchema>({
		schema: searchSchema
	});
	const [mutationFn] = useSearch();
	const mutation = useMutation(mutationFn, {
		onSuccess: (searchResult) => {
			onResult(searchResult);
		},
		onError: (error: ServerValidationError) => {
			ExtractErrors.fromServerValidationErrorToFormErrors<SearchSchema>(error)(setError);
			onError?.(error);
		}
	});

	const onSubmit: SubmitHandler<SearchSchema> = (values) => {
		return mutation.mutateAsync(values);
	};

	const handleClose = () => {
		reset({ query: '' });
		onCancel?.();
	};

	return (
		<Modal
			open={open}
			title='Sök i Discogs'
			cancelText='Stäng'
			okText='Sök'
			onCancel={handleClose}
			onOk={handleSubmit(onSubmit)}>
			<FormItem control={control} name='query' label='Sökfras'>
				<Input autoFocus />
			</FormItem>
		</Modal>
	);
};
