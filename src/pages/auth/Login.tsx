import { Button, Card, Divider, Form, Input } from 'antd';
import { useForm } from '../../hooks/useForm';
import { LoginSchema, loginSchema } from '../../services/auth/types';
import FormItem from '../../lib/form/FormItem';
import { useNavigate } from 'react-router-dom';
import Link from '../../components/navigation/Link';
import { useLogin } from '../../services/auth/hooks/useLogin';
import { useMutation } from '@tanstack/react-query';
import { ExtractErrors } from '../../lib/error/ExtractErrors';
import { ServerValidationError } from '../../lib/error/types';
import { SubmitHandler } from 'react-hook-form';
import { useAuthContext } from '../../contexts/auth/useAuthContext';

export function Component() {
	const { fetchUser } = useAuthContext();
	const [mutationFn] = useLogin();
	const navigate = useNavigate();
	const { control, handleSubmit, setError } = useForm<LoginSchema>({
		defaultValues: {
			email: '',
			password: ''
		},
		schema: loginSchema
	});

	const mutation = useMutation<void, ServerValidationError, LoginSchema>(mutationFn, {
		onSuccess: () => {
			fetchUser();
		},
		onError: (error) => {
			ExtractErrors.fromServerValidationErrorToFormErrors<LoginSchema>(error)(setError);
		}
	});

	const onSubmit: SubmitHandler<LoginSchema> = (values) => {
		mutation.mutate(values);
	};

	return (
		<Card title='Logga in'>
			<Form onFinish={handleSubmit(onSubmit)} layout='vertical'>
				<FormItem control={control} name='email' label='E-post'>
					<Input />
				</FormItem>
				<FormItem control={control} name='password' label='Lösenord'>
					<Input.Password />
				</FormItem>
				<div className='my-4'>
					<Link to='/forgot-password'>Glömt lösenordet?</Link>
				</div>
				<Button type='primary' htmlType='submit' block>
					Logga in
				</Button>
				<Divider>har du inget konto?</Divider>
				<Button type='default' htmlType='button' onClick={() => navigate('/register')} block>
					Registrera konto
				</Button>
			</Form>
		</Card>
	);
}
