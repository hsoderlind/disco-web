import { loadCompanyForShop as loader } from '../../services/company/loaders';
import { ErrorBoundary } from '../../components/error-boundary';
import { useLoaderData } from '../../hooks/useLoaderData';
import { Company } from '../../services/company/Company';
import { useForm } from '../../hooks/useForm';
import { CompanySchema, companySchema } from '../../services/company/types';
import { useUpdateCompany } from '../../services/company/hooks/useUpdateCompany';
import app from '../../lib/application-builder/ApplicationBuilder';
import { ExtractErrors } from '../../lib/error/ExtractErrors';
import { SubmitHandler } from 'react-hook-form';
import { MainContentLayout } from '../../components/layout/content-layout/MainContentLayout';
import { ContentLayout } from '../../components/layout/content-layout/ContentLayout';
import { ButtonBar } from '../../components/forms/buttonbar';
import { Button, Col, Divider, Form, Input, Row, Typography } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { FaGlobeEurope } from 'react-icons/fa';

export { loader, ErrorBoundary };

export function Component() {
	const company = useLoaderData<Company>();
	const {
		control,
		handleSubmit,
		setError,
		formState: { isDirty, isSubmitting }
	} = useForm<CompanySchema>({
		defaultValues: company.toJSON(),
		schema: companySchema
	});
	const mutation = useUpdateCompany(company.getKey(), {
		onSuccess: () => {
			app.addSuccessNotification({ description: 'Bolagsinformation har nu uppdaterats.' });
		},
		onError: (error) => {
			app.addErrorNotification({ description: error.message });
			ExtractErrors.fromServerValidationErrorToFormErrors<CompanySchema>(error)(setError);
		}
	});

	const onSubmit: SubmitHandler<CompanySchema> = (formValues) => mutation.mutateAsync(formValues);

	return (
		<ContentLayout>
			<MainContentLayout
				renderButtonBar={
					<ButtonBar>
						<Button type='primary' onClick={handleSubmit(onSubmit)} disabled={!isDirty} loading={isSubmitting}>
							Spara
						</Button>
					</ButtonBar>
				}>
				<Form layout='vertical' className='md:w-half block-center'>
					<Typography.Title level={2}>Företagsuppgifter</Typography.Title>
					<Row gutter={[16, 0]}>
						<Col xs={24} md={12}>
							<FormItem control={control} name='name' label='Namn'>
								<Input />
							</FormItem>
						</Col>
						<Col xs={24} md={12}>
							<FormItem control={control} name='orgnumber' label='Organisationsnummer'>
								<Input />
							</FormItem>
						</Col>
					</Row>
					<Row gutter={[16, 0]}>
						<Col xs={24} md={12}>
							<FormItem control={control} name='vat_number' label='Momsregistreringsnummer'>
								<Input />
							</FormItem>
						</Col>
					</Row>
					<FormItem control={control} name='support_address.address1' label='Adressrad 1'>
						<Input />
					</FormItem>
					<FormItem control={control} name='support_address.address2' label='Adressrad 2'>
						<Input />
					</FormItem>
					<Row gutter={[16, 0]}>
						<Col xs={24} md={12}>
							<FormItem control={control} name='support_address.zip' label='Postnummer'>
								<Input maxLength={6} />
							</FormItem>
						</Col>
						<Col xs={24} md={12}>
							<FormItem control={control} name='support_address.city' label='Ort'>
								<Input />
							</FormItem>
						</Col>
					</Row>
					<FormItem control={control} name='official_website' label='Hemsida'>
						<Input addonBefore={<FaGlobeEurope />} />
					</FormItem>
					<Divider />
					<Typography.Title level={3}>Kontaktuppgifter</Typography.Title>
					<Row gutter={[16, 0]}>
						<Col xs={24} md={12}>
							<FormItem control={control} name='support_email' label='E-post'>
								<Input addonBefore={<MailOutlined />} />
							</FormItem>
						</Col>
						<Col xs={24} md={12}>
							<FormItem control={control} name='support_phone' label='Telefon'>
								<Input addonBefore={<PhoneOutlined />} />
							</FormItem>
						</Col>
					</Row>
					<Divider />
					<Typography.Title level={3}>Webbadresser</Typography.Title>
					<FormItem control={control} name='support_website' label='Kundtjänst Hemsida'>
						<Input addonBefore={<FaGlobeEurope />} />
					</FormItem>
					<Row gutter={[16, 0]}>
						<Col xs={24} md={12}>
							<FormItem control={control} name='privacy_police_url' label='Integritetspolicy'>
								<Input addonBefore={<FaGlobeEurope />} />
							</FormItem>
						</Col>
						<Col xs={24} md={12}>
							<FormItem control={control} name='terms_of_agreement_url' label='Försäljningsvillkor'>
								<Input addonBefore={<FaGlobeEurope />} />
							</FormItem>
						</Col>
					</Row>{' '}
				</Form>
			</MainContentLayout>
		</ContentLayout>
	);
}
