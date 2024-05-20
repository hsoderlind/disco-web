import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { ButtonBar } from '../../../../components/forms/buttonbar';
import { MainContentLayout } from '../../../../components/layout/content-layout/MainContentLayout';
import { FormProvider, SubmitHandler } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { useShopStore } from '../../../../services/shop/store';
import { useForm } from '../../../../hooks/useForm';
import { ShopSchema, shopSchema } from '../../../../services/shop/types';
import { useUpdateShop } from '../../../../services/shop/hooks/useUpdateShop';
import app from '../../../../lib/application-builder/ApplicationBuilder';
import { ExtractErrors } from '../../../../lib/error/ExtractErrors';

export const Details = () => {
	const shop = useShopStore((state) => state.shop);
	const update = useShopStore((state) => state.update);
	const methods = useForm<ShopSchema>({
		defaultValues: shop,
		schema: shopSchema
	});

	const {
		control,
		handleSubmit,
		setError,
		formState: { isDirty, isSubmitting }
	} = methods;

	const mutation = useUpdateShop(shop.id, {
		onSuccess: (shop) => {
			app.addSuccessNotification({ description: 'Butiksprofilen har nu uppdaterats' });
			update(shop.toJSON());
		},
		onError: (error) => {
			app.addErrorNotification({ description: error.message });
			ExtractErrors.fromServerValidationErrorToFormErrors<ShopSchema>(error)(setError);
		}
	});

	const onSubmit: SubmitHandler<ShopSchema> = (formValues) => mutation.mutateAsync(formValues);

	return (
		<MainContentLayout
			renderButtonBar={
				<ButtonBar>
					<Button type='primary' disabled={!isDirty} loading={isSubmitting} onClick={handleSubmit(onSubmit)}>
						Spara
					</Button>
				</ButtonBar>
			}>
			<Typography.Title level={2}>Butiksprofil</Typography.Title>
			<FormProvider {...methods}>
				<Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
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
					<FormItem control={control} name='address_street1' label='Adressrad 1'>
						<Input />
					</FormItem>
					<FormItem control={control} name='address_street2' label='Adressrad 2'>
						<Input />
					</FormItem>
					<Row gutter={[16, 0]}>
						<Col xs={24} md={12}>
							<FormItem control={control} name='address_zip' label='Postnummer'>
								<Input />
							</FormItem>
						</Col>
						<Col xs={24} md={12}>
							<FormItem control={control} name='address_city' label='Ort'>
								<Input />
							</FormItem>
						</Col>
					</Row>
				</Form>
			</FormProvider>
		</MainContentLayout>
	);
};
