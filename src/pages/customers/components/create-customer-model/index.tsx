import { Divider, Form, Input, Modal, Switch } from 'antd';
import { useForm } from '../../../../hooks/useForm';
import { CustomerSchema, customerSchema } from '../../../../services/customer/types';
import { CreateCustomerModelProps } from './types';
import { useCreateCustomer } from '../../../../services/customer/hooks/useCreateCustomer';
import app from '../../../../lib/application-builder/ApplicationBuilder';
import { ExtractErrors } from '../../../../lib/error/ExtractErrors';
import { SubmitHandler } from 'react-hook-form';
import FormItem from '../../../../lib/form/FormItem';
import { useState } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { CurrencySelect } from '../../../../components/forms/controls/currency-select';
import { CountrySelect } from '../../../../components/forms/controls/country-select';
import { SwitchChangeEventHandler } from 'antd/es/switch';

export const CreateCustomerModal = ({ open, onCancel, onCreated }: CreateCustomerModelProps) => {
	const [isCompany, setIsCompany] = useState(false);
	const [sameAsBillingAddress, setSameAsBillingAddress] = useState(false);
	const { control, setError, handleSubmit, watch, setValue, getValues } = useForm<CustomerSchema>({
		defaultValues: {
			billing_address: {
				address1: '',
				city: '',
				zip: '',
				phone: ''
			},
			company_name: '',
			currency: 'SEK',
			email: '',
			note: '',
			person_name: '',
			ssn: '',
			orgno: '',
			taxable: true,
			vatno: '',
			shipping_address: {
				address1: '',
				city: '',
				zip: '',
				phone: ''
			}
		},
		schema: customerSchema
	});

	const taxable = watch('taxable');
	const billingAddressCountry = watch('billing_address.country');
	const shippingAddressCountry = watch('shipping_address.country');

	const mutation = useCreateCustomer({
		onSuccess(customer) {
			app.addSuccessNotification({ description: 'Kunden har nu lats till.' });
			onCreated?.(customer);
		},
		onError(error) {
			ExtractErrors.fromServerValidationErrorToFormErrors<CustomerSchema>(error)(setError);
		}
	});

	const onSubmit: SubmitHandler<CustomerSchema> = (values) => {
		return mutation.mutateAsync(values);
	};

	const setShippingAddress: SwitchChangeEventHandler = (checked) => {
		if (checked) {
			setValue('shipping_address', getValues('billing_address'));
		}

		setSameAsBillingAddress(checked);
	};

	return (
		<Modal
			title='Lägg till kund'
			open={open}
			onCancel={onCancel}
			onOk={handleSubmit(onSubmit)}
			cancelText='Stäng'
			okText='Spara & stäng'>
			<Form layout='vertical'>
				<Form.Item label='Kunden är ett bolag'>
					<Switch
						checkedChildren={<CheckOutlined />}
						unCheckedChildren={<CloseOutlined />}
						defaultChecked={isCompany}
						onChange={setIsCompany}
					/>
				</Form.Item>
				{!isCompany && (
					<FormItem control={control} name='person_name' label='Namn'>
						<Input />
					</FormItem>
				)}
				{isCompany && (
					<FormItem control={control} name='company_name' label='Namn'>
						<Input />
					</FormItem>
				)}
				<FormItem control={control} name='email' label='E-post'>
					<Input />
				</FormItem>
				{!isCompany && (
					<FormItem control={control} name='ssn' label='Personnummer'>
						<Input />
					</FormItem>
				)}
				{isCompany && (
					<FormItem control={control} name='orgno' label='Organisationsnummer'>
						<Input />
					</FormItem>
				)}
				<Divider />
				<h3 className='h3'>Faktureringsuppgifter</h3>
				<FormItem control={control} name='billing_address.country'>
					<CountrySelect placeholder='Land' />
				</FormItem>
				{billingAddressCountry?.length > 1 && (
					<>
						<FormItem control={control} name='billing_address.name'>
							<Input placeholder='Namn' />
						</FormItem>
						<FormItem control={control} name='billing_address.address1'>
							<Input placeholder='Adress 1' />
						</FormItem>
						<FormItem control={control} name='billing_address.address2'>
							<Input placeholder='Adress 2' />
						</FormItem>
						<FormItem control={control} name='billing_address.zip'>
							<Input placeholder='Postnummer' />
						</FormItem>
						<FormItem control={control} name='billing_address.city'>
							<Input placeholder='Ort' />
						</FormItem>
					</>
				)}
				<Divider />
				<h3 className='h3'>Leveransuppgifter</h3>
				<Form.Item label='Samma som faktureringsuppgifterna'>
					<Switch
						checkedChildren={<CheckOutlined />}
						unCheckedChildren={<CloseOutlined />}
						defaultChecked={sameAsBillingAddress}
						onChange={setShippingAddress}
					/>
				</Form.Item>
				<FormItem control={control} name='shipping_address.country'>
					<CountrySelect placeholder='Land' />
				</FormItem>
				{shippingAddressCountry?.length > 1 && (
					<>
						<FormItem control={control} name='shipping_address.name'>
							<Input placeholder='Namn' />
						</FormItem>
						<FormItem control={control} name='shipping_address.address1'>
							<Input placeholder='Adress 1' />
						</FormItem>
						<FormItem control={control} name='shipping_address.address2'>
							<Input placeholder='Adress 2' />
						</FormItem>
						<FormItem control={control} name='shipping_address.zip'>
							<Input placeholder='Postnummer' />
						</FormItem>
						<FormItem control={control} name='shipping_address.city'>
							<Input placeholder='Ort' />
						</FormItem>
					</>
				)}
				<Divider />
				<FormItem control={control} name='currency' label='Valuta'>
					<CurrencySelect />
				</FormItem>
				<FormItem control={control} name='taxable' label='Skattepliktig' valuePropName='checked'>
					<Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
				</FormItem>
				{!taxable && (
					<FormItem control={control} name='vatno' label='Momsregnr'>
						<Input />
					</FormItem>
				)}
			</Form>
		</Modal>
	);
};
