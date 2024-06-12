import { Button, Card, Form, FormInstance, Input, InputNumber, Switch } from 'antd';
import { Ref, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { RouteParams } from '../../../types/common';
import { useShopStore } from '../../../services/shop/store';
import { queryListShippingMethods } from '../../../services/shipping-method/queries';
import { useReadShippingMethod } from '../../../services/shipping-method/hooks/useReadShippingMethod';
import { useUpdateShippingMethod } from '../../../services/shipping-method/hooks/useUpdateShippingMethod';
import app from '../../../lib/application-builder/ApplicationBuilder';
import { ExtractErrors } from '../../../lib/error/ExtractErrors';
import { ShippingMethodSchema, shippingMethodSchema } from '../../../services/shipping-method/types';
import { useForm } from '../../../hooks/useForm';
import { SubmitHandler } from 'react-hook-form';
import { CheckOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { FormItem } from 'react-hook-form-antd';

export function Component() {
	const formRef = useRef<FormInstance<any>>();
	const params = useParams<RouteParams>();
	const shopId = useShopStore((state) => state.shop.id);
	const [queryKey] = queryListShippingMethods(shopId);
	const { data: shippingMethod, isFetching, isLoading } = useReadShippingMethod(params.name!);
	const {
		control,
		handleSubmit,
		setError,
		setValue,
		formState: { isDirty, isSubmitting }
	} = useForm<ShippingMethodSchema>({
		defaultValues: shippingMethod?.toJSON(),
		schema: shippingMethodSchema
	});
	const mutation = useUpdateShippingMethod(params.name!, {
		onSuccess: () => {
			app.addSuccessNotification({ description: 'Leveranssättet har nu uppdaterats' });
			app.queryClient.invalidateQueries(queryKey);
		},
		onError: (error) => {
			app.addErrorNotification({ description: error.message });
			ExtractErrors.fromServerValidationErrorToFormErrors<ShippingMethodSchema>(error)(setError);
		}
	});

	const onSubmit: SubmitHandler<ShippingMethodSchema> = (formValues) => mutation.mutateAsync(formValues);

	useEffect(() => {
		if (typeof shippingMethod !== 'undefined') {
			const entries = Object.entries(shippingMethod.toJSON());

			entries.forEach(([key, value]) => {
				setValue(key as keyof ShippingMethodSchema, value);
				formRef.current?.setFieldValue(key, value);
			});
		}
	}, [shippingMethod, setValue]);

	return (
		<Form ref={formRef as Ref<FormInstance<any>>} onFinish={handleSubmit(onSubmit)} layout='vertical'>
			<Card
				loading={isFetching || isLoading}
				title={`Redigerar: ${shippingMethod?.get('title')}`}
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
				<FormItem control={control} name='fee' label='Kostnad'>
					<InputNumber precision={2} addonAfter='kr' />
				</FormItem>
				<FormItem control={control} name='sort_order' label='Sorteringsordning'>
					<InputNumber min={0} step={1} />
				</FormItem>
				<FormItem control={control} name='active' label='Aktiv' valuePropName='checked'>
					<Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
				</FormItem>
			</Card>
		</Form>
	);
}
