import { useResetPassword } from '../../services/auth/hooks/useResetPassword';
import { useForm } from '../../hooks/useForm';
import { ResetPasswordSchema, resetPasswordSchema } from '../../services/auth/types';
import { useMutation } from '@tanstack/react-query';
import { ServerValidationError } from '../../lib/error/types';
import { ExtractErrors } from '../../lib/error/ExtractErrors';
import { SubmitHandler } from 'react-hook-form';
import { Button, Card, Form, Input, message } from 'antd';
import FormItem from '../../lib/form/FormItem';
import { Message } from '../../types/common';
import { useNavigate } from 'react-router-dom';

export function Component() {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
	const [mutationFn] = useResetPassword();
	const { control, handleSubmit, setError } = useForm<ResetPasswordSchema>({
		defaultValues: {
			password: '',
			password_confirmation: ''
		},
		schema: resetPasswordSchema
	});

	const mutation = useMutation<Message, ServerValidationError, ResetPasswordSchema>(mutationFn, {
		onSuccess: ({ message }) => {
			messageApi.info(message).then(() => {
				navigate('/login');
			});
		},
		onError: (error) => {
			ExtractErrors.fromServerValidationErrorToFormErrors<ResetPasswordSchema>(error)(setError);
		}
	});

	const onSubmit: SubmitHandler<ResetPasswordSchema> = (values) => {
		mutation.mutate(values);
	};

	return (
		<Card title='Återställ lösenord'>
			{contextHolder}
			<Form onFinish={handleSubmit(onSubmit)} layout='vertical'>
				<FormItem control={control} name='password' label='Lösenord'>
					<Input.Password />
				</FormItem>
				<FormItem control={control} name='password_confirmation' label='Bekräfta lösenord'>
					<Input.Password />
				</FormItem>
				<Button type='primary' htmlType='submit'>
					Spara
				</Button>
			</Form>
		</Card>
	);
}
