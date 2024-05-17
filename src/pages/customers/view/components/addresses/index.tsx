import { SubmitHandler } from 'react-hook-form';
import { useForm } from '../../../../../hooks/useForm';
import { useLoaderData } from '../../../../../hooks/useLoaderData';
import { useNavigate } from '../../../../../hooks/useNavigate';
import app from '../../../../../lib/application-builder/ApplicationBuilder';
import { ExtractErrors } from '../../../../../lib/error/ExtractErrors';
import { Customer } from '../../../../../services/customer/Customer';
import { useUpdateCustomer } from '../../../../../services/customer/hooks/useUpdateCustomer';
import { CustomerSchema, customerSchema } from '../../../../../services/customer/types';
import { MainContentLayout } from '../../../../../components/layout/content-layout/MainContentLayout';
import { ButtonBar } from '../../../../../components/forms/buttonbar';
import { Button, Form, Input, Tabs, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import FormItem from '../../../../../lib/form/FormItem';
import { CountrySelect } from '../../../../../components/forms/controls/country-select';

export const Addresses = () => {
	const navigate = useNavigate();
	const customer = useLoaderData<Customer>();
	const {
		control,
		handleSubmit,
		setError,
		formState: { isDirty, isSubmitting }
	} = useForm<CustomerSchema>({
		defaultValues: customer.toJSON(),
		schema: customerSchema
	});
	const mutation = useUpdateCustomer(customer.getKey()!, {
		onSuccess() {
			app.addSuccessNotification({ description: 'Kunden har  u uppdaterats' });
		},
		onError(error) {
			ExtractErrors.fromServerValidationErrorToFormErrors<CustomerSchema>(error)(setError);
			app.addErrorNotification({ description: 'Kunden kunde inte uppdateras' });
		}
	});

	const onSubmit: SubmitHandler<CustomerSchema> = (values) => {
		return mutation.mutateAsync(values);
	};

	const goToCustomers = () => {
		navigate('../', 'Kunder');
	};

	return (
		<MainContentLayout
			renderButtonBar={
				<ButtonBar>
					<Button type='default' icon={<ArrowLeftOutlined />} onClick={goToCustomers} size='large'>
						Kunder
					</Button>
					<Button
						type='primary'
						size='large'
						disabled={!isDirty}
						loading={isSubmitting}
						onClick={handleSubmit(onSubmit)}>
						Spara
					</Button>
				</ButtonBar>
			}>
			<Form layout='vertical'>
				<Typography.Title level={2}>Adresser</Typography.Title>
				<Tabs
					defaultActiveKey='billing_address'
					items={[
						{
							key: 'billing_address',
							label: 'Faktureringsadress',
							children: (
								<div className='py-5'>
									<FormItem control={control} name='billing_address.country'>
										<CountrySelect placeholder='Land' />
									</FormItem>
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
								</div>
							)
						},
						{
							key: 'shipping_address',
							label: 'Leveransadress',
							children: (
								<div className='py-5'>
									<FormItem control={control} name='shipping_address.country'>
										<CountrySelect placeholder='Land' />
									</FormItem>
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
								</div>
							)
						}
					]}
				/>
			</Form>
		</MainContentLayout>
	);
};
