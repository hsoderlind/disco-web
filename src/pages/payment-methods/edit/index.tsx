import { FormProvider, SubmitHandler } from 'react-hook-form';
import { useForm } from '../../../hooks/useForm';
import app from '../../../lib/application-builder/ApplicationBuilder';
import { ExtractErrors } from '../../../lib/error/ExtractErrors';
import { useUpdatePaymentMethod } from '../../../services/payment-method/hooks/useUpdatePaymentMethod';
import { queryListPaymentMethods } from '../../../services/payment-method/queries';
import { PaymentMethodSchema, paymentMethodSchema } from '../../../services/payment-method/types';
import { useShopStore } from '../../../services/shop/store';
import { Button, Card, Form, Input, InputNumber, Switch } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { CheckOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { ComponentProvider } from '../../../services/payment-method/components/component-provider';
import { useLoaderData } from '../../../hooks/useLoaderData';
import { PaymentMethod } from '../../../services/payment-method/PaymentMethod';
import { loadPaymentMethod as loader } from '../../../services/payment-method/loaders';
import { Ref, useEffect, useRef } from 'react';
import { FormInstance } from 'antd/lib/form/Form';
import { DevTool } from '@hookform/devtools';

export { loader };

export function Component() {
	const formRef = useRef<FormInstance<any>>();
	const paymentMethod = useLoaderData<PaymentMethod>();
	const shopId = useShopStore((state) => state.shop.id);
	const [queryKey] = queryListPaymentMethods(shopId, true);
	const methods = useForm<PaymentMethodSchema>({
		defaultValues: paymentMethod.toJSON(),
		schema: paymentMethodSchema
	});
	const {
		control,
		handleSubmit,
		setError,
		setValue,
		formState: { isDirty, isSubmitting, errors }
	} = methods;
	console.log('errors', errors);

	const mutation = useUpdatePaymentMethod({
		onSuccess: () => {
			app.addSuccessNotification({ description: 'Betalningssättet har nu uppdaterats' });
			app.queryClient.invalidateQueries(queryKey);
		},
		onError: (error) => {
			app.addErrorNotification({ description: error.message });
			ExtractErrors.fromServerValidationErrorToFormErrors<PaymentMethodSchema>(error)(setError);
		}
	});

	const onSubmit: SubmitHandler<PaymentMethodSchema> = (formValues) => mutation.mutateAsync(formValues);

	useEffect(() => {
		const entries = Object.entries(paymentMethod.toJSON());

		entries.forEach(([key, value]) => {
			setValue(key as keyof PaymentMethodSchema, value);
			formRef.current?.setFieldValue(key, value);
		});
	}, [paymentMethod, setValue]);

	return (
		<FormProvider {...methods}>
			<Form ref={formRef as Ref<FormInstance<any>>} layout='vertical' onFinish={handleSubmit(onSubmit)}>
				<Card
					title={`Redigerar: ${paymentMethod.get('title')}`}
					actions={[
						<Button htmlType='submit' type='primary' icon={<SaveOutlined />} disabled={!isDirty} loading={isSubmitting}>
							Spara
						</Button>
					]}>
					<FormItem control={control} name='title' label='Rubrik'>
						<Input />
					</FormItem>
					<FormItem control={control} name='description' label='Beskrivning'>
						<Input.TextArea rows={3} />
					</FormItem>
					<FormItem control={control} name='sort_order' label='Sorteringsordning'>
						<InputNumber min={0} step={1} />
					</FormItem>
					<FormItem control={control} name='active' label='Aktiv' valuePropName='checked'>
						<Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
					</FormItem>
					{!!paymentMethod.get('admin_component') && (
						<ComponentProvider componentPath={paymentMethod.get('admin_component')} />
					)}
				</Card>
				<DevTool control={control} />
			</Form>
		</FormProvider>
	);
}
