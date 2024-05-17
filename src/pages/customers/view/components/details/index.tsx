import { SubmitHandler } from 'react-hook-form';
import { useForm } from '../../../../../hooks/useForm';
import { useLoaderData } from '../../../../../hooks/useLoaderData';
import app from '../../../../../lib/application-builder/ApplicationBuilder';
import { ExtractErrors } from '../../../../../lib/error/ExtractErrors';
import { Customer } from '../../../../../services/customer/Customer';
import { useUpdateCustomer } from '../../../../../services/customer/hooks/useUpdateCustomer';
import { CustomerSchema, customerSchema } from '../../../../../services/customer/types';
import { Button, Divider, Form, Input, Switch, Typography } from 'antd';
import FormItem from '../../../../../lib/form/FormItem';
import { CurrencySelect } from '../../../../../components/forms/controls/currency-select';
import { MainContentLayout } from '../../../../../components/layout/content-layout/MainContentLayout';
import { ArrowLeftOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { ButtonBar } from '../../../../../components/forms/buttonbar';
import { useNavigate } from '../../../../../hooks/useNavigate';

export const Details = () => {
	const navigate = useNavigate();
	const customer = useLoaderData<Customer>();
	const isCompany = customer.get<string>('company_name')?.length > 0;
	const {
		control,
		handleSubmit,
		setError,
		watch,
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

	const taxable = watch('taxable');

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
				<Typography.Title level={2}>Uppgifter</Typography.Title>
				{isCompany ? (
					<FormItem control={control} name='company_name' label='Namn'>
						<Input />
					</FormItem>
				) : (
					<FormItem control={control} name='person_name' label='Namn'>
						<Input />
					</FormItem>
				)}
				<FormItem control={control} name='email' label='E-post'>
					<Input />
				</FormItem>
				{isCompany ? (
					<FormItem control={control} name='orgno' label='Organisationsnummer'>
						<Input />
					</FormItem>
				) : (
					<FormItem control={control} name='ssn' label='Personnummer'>
						<Input />
					</FormItem>
				)}
				<Divider />
				<FormItem control={control} name='currency' label='Valuta'>
					<CurrencySelect />
				</FormItem>
				<Divider />
				<FormItem control={control} name='taxable' label='Skattepliktig' valuePropName='checked'>
					<Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
				</FormItem>
				{!taxable && (
					<FormItem control={control} name='vatno' label='Momsregnr'>
						<Input />
					</FormItem>
				)}
			</Form>
		</MainContentLayout>
	);
};
