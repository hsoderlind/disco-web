import { FC, ReactNode } from 'react';
import { Control } from 'react-hook-form';
import { Form, Input } from 'antd';
import FormItem from '../../lib/form/FormItem';
import { ShopSchema } from '../../services/shop/types';

export type RegisterShopFormProps = {
	onFinish?: (...args: any[]) => void;
	footer?: ReactNode;
	control: Control<ShopSchema, any>;
};

const RegisterShopForm: FC<RegisterShopFormProps> = ({ onFinish, footer, control }) => {
	return (
		<Form layout='vertical' onFinish={onFinish}>
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
			{footer}
		</Form>
	);
};

export default RegisterShopForm;
