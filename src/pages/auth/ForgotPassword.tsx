import { FC } from 'react';
import { useSendResetPasswordLink } from '../../services/auth/hooks/useSendResetPasswordLink';
import { useMutation } from '@tanstack/react-query';
import { useForm } from '../../hooks/useForm';
import { ForgotPasswordSchema, forgotPasswordSchema } from '../../services/auth/types';
import { ServerValidationError } from '../../lib/error/types';
import { ExtractErrors } from '../../lib/error/ExtractErrors';
import { SubmitHandler } from 'react-hook-form';
import { Button, Card, Form, Input, message } from 'antd';
import FormItem from '../../lib/form/FormItem';
import Link from '../../components/Link';
import { Message } from '../../types/common';

const ForgotPassword: FC = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const [mutationFn] = useSendResetPasswordLink();
	const { control, handleSubmit, setError } = useForm<ForgotPasswordSchema>({
		defaultValues: {
			email: ''
		},
		schema: forgotPasswordSchema
	});

	const mutation = useMutation<Message, ServerValidationError, ForgotPasswordSchema>(mutationFn, {
		onSuccess: ({ message }) => {
			messageApi.info(message);
		},
		onError: (error) => {
			ExtractErrors.fromServerValidationErrorToFormErrors<ForgotPasswordSchema>(error)(setError);
		}
	});

	const onSubmit: SubmitHandler<ForgotPasswordSchema> = (values) => {
		mutation.mutate(values);
	};

	return (
		<Card title='Glömt lösenord'>
			{contextHolder}
			<Form onFinish={handleSubmit(onSubmit)} layout='vertical'>
				<FormItem control={control} name='email' label='E-post'>
					<Input />
				</FormItem>
				<div className='combined-buttons-container'>
					<div className='combined-buttons-wrapper'>
						<Button type='primary' htmlType='submit'>
							Skicka
						</Button>
					</div>
					<div className='combined-buttons-prompt'>
						<Link to='/register'>Skapa konto</Link>
					</div>
				</div>
			</Form>
		</Card>
	);
};

export default ForgotPassword;
