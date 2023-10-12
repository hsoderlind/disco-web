import { FC } from 'react';
import { useForm } from '../../hooks/useForm';
import { ShopSchema, shopSchema } from '../../services/shop/types';
import { useCreateShop } from '../../services/shop/hooks/useCreateShop';
import { useMutation } from '@tanstack/react-query';
import Shop from '../../services/shop/Shop';
import { ServerValidationError } from '../../lib/error/types';
import { ExtractErrors } from '../../lib/error/ExtractErrors';
import { SubmitHandler } from 'react-hook-form';
import { Alert, Form, Input, Modal } from 'antd';
import FormItem from '../../lib/form/FormItem';

export type RegisterShopModalProps = {
	open: boolean;
	onAfterCreate?: (shop: Shop) => void;
	onClose: () => void;
};

const RegisterShopModal: FC<RegisterShopModalProps> = ({ open, onAfterCreate, onClose }) => {
	const [mutationFn] = useCreateShop();
	const { control, handleSubmit, setError } = useForm<ShopSchema>({
		defaultValues: {
			name: '',
			orgnumber: '',
			address_street1: '',
			address_street2: '',
			address_zip: '',
			address_city: ''
		},
		schema: shopSchema
	});

	const mutation = useMutation<Shop, ServerValidationError, ShopSchema>(mutationFn, {
		onSuccess: (data) => {
			onAfterCreate?.(data);
		},
		onError: (error) => {
			ExtractErrors.fromServerValidationErrorToFormErrors<ShopSchema>(error)(setError);
		}
	});

	const onSubmit: SubmitHandler<ShopSchema> = (values) => {
		mutation.mutate(values);
	};

	return (
		<Modal
			open={open}
			cancelText='Stäng'
			okText='Registrera'
			title='Registrera din butik'
			onCancel={onClose}
			onOk={handleSubmit(onSubmit)}>
			<Alert
				message='Välkommen till Disco!'
				description={
					<p>
						Nu är du snart redo att börja använda applikationen, men först behöver vi veta lite om din butik.
						<br />
						Fyll i formuläret nedan och sedan är du igång!
					</p>
				}
				type='info'
				className='my-5'
			/>
			<Form layout='vertical'>
				<FormItem control={control} name='name' label='Namn'>
					<Input />
				</FormItem>
				<FormItem control={control} name='orgnumber' label='Organisationsnummer'>
					<Input />
				</FormItem>
				<FormItem control={control} name='address_street1' label='Adressrad 1'>
					<Input />
				</FormItem>
				<FormItem control={control} name='address_street2' label='Adressrad 2'>
					<Input />
				</FormItem>
				<FormItem control={control} name='address_zip' label='Postnummer'>
					<Input />
				</FormItem>
				<FormItem control={control} name='address_city' label='Ort'>
					<Input />
				</FormItem>
			</Form>
		</Modal>
	);
};

export default RegisterShopModal;
