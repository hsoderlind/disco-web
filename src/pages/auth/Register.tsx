import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { RegisterSchema, registerSchema } from '../../services/auth/types';
import { Button, Card, Divider, Form, Input } from 'antd';
import FormItem from '../../lib/form/FormItem';
import { useMutation } from '@tanstack/react-query';
import { useRegisterUser } from '../../services/auth/hooks/useRegisterUser';
import { ServerValidationError } from '../../lib/error/types';
import { ExtractErrors } from '../../lib/error/ExtractErrors';
import { SubmitHandler } from 'react-hook-form';
import { useAuthContext } from '../../contexts/auth/useAuthContext';

const Register: FC = () => {
	const { fetchUser } = useAuthContext();
	const [mutationFn] = useRegisterUser();
	const navigate = useNavigate();
	const { control, handleSubmit, setError } = useForm<RegisterSchema>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
			password_confirmation: ''
		},
		schema: registerSchema
	});

	const mutation = useMutation<void, ServerValidationError, RegisterSchema>(mutationFn, {
		onSuccess: () => {
			fetchUser();
			navigate('/');
		},
		onError: (error) => {
			ExtractErrors.fromServerValidationErrorToFormErrors<RegisterSchema>(error)(setError);
		}
	});

	const onSubmit: SubmitHandler<RegisterSchema> = (values) => {
		mutation.mutate(values);
	};

	return (
		<Card title='Registrera konto'>
			<Form onFinish={handleSubmit(onSubmit)} layout='vertical'>
				<FormItem control={control} name='name' label='Namn'>
					<Input />
				</FormItem>
				<FormItem control={control} name='email' label='E-post'>
					<Input />
				</FormItem>
				<FormItem control={control} name='password' label='Lösenord'>
					<Input.Password />
				</FormItem>
				<FormItem control={control} name='password_confirmation' label='Bekräfta lösenord'>
					<Input.Password />
				</FormItem>
				<Button type='primary' htmlType='submit' block>
					Registrera
				</Button>
				<Divider>har du redan ett konto?</Divider>
				<Button type='default' htmlType='button' onClick={() => navigate('/login')} block>
					Logga in
				</Button>
			</Form>
		</Card>
	);
};

export default Register;
