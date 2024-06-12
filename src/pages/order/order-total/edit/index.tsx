import { useParams } from 'react-router-dom';
import { useGetOrderTotal } from '../../../../services/order/hooks/useGetOrderTotal';
import { RouteParams } from '../../../../types/common';
import { useUpdateOrderTotal } from '../../../../services/order/hooks/useUpdateOrderTotal';
import app from '../../../../lib/application-builder/ApplicationBuilder';
import { queryGetOrderTotalRepository } from '../../../../services/order/queries';
import { useShopStore } from '../../../../services/shop/store';
import { useForm } from '../../../../hooks/useForm';
import { BaseOrderTotalRepositorySchema, baseOrderTotalRepositorySchema } from '../../../../services/order/types';
import { SubmitHandler } from 'react-hook-form';
import { useRef, Ref, useEffect } from 'react';
import { Button, Card, Form, FormInstance, Input, InputNumber, Switch } from 'antd';
import { CheckOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { FormItem } from 'react-hook-form-antd';
import { ComponentProvider } from '../../../../services/order/components/component-provider';
import { ExtractErrors } from '../../../../lib/error/ExtractErrors';

export function Component() {
	const formRef = useRef<FormInstance<any>>();
	const params = useParams<RouteParams>();
	const shopId = useShopStore((state) => state.shop.id);
	const [queryKey] = queryGetOrderTotalRepository(params.name!, shopId);
	const { data: orderTotal, isLoading, isFetching } = useGetOrderTotal(params.name!);
	const {
		control,
		handleSubmit,
		setError,
		setValue,
		formState: { isDirty, isSubmitting }
	} = useForm<BaseOrderTotalRepositorySchema>({
		defaultValues: orderTotal?.toJSON(),
		schema: baseOrderTotalRepositorySchema
	});
	const mutation = useUpdateOrderTotal(params.name!, {
		onSuccess: () => {
			app.addSuccessNotification({ description: 'Order total har nu uppdaterats' });
			app.queryClient.invalidateQueries(queryKey);
		},
		onError: (error) => {
			app.addErrorNotification({ description: error.message });
			ExtractErrors.fromServerValidationErrorToFormErrors<BaseOrderTotalRepositorySchema>(error)(setError);
		}
	});

	const onSubmit: SubmitHandler<BaseOrderTotalRepositorySchema> = (formValues) => mutation.mutateAsync(formValues);

	useEffect(() => {
		if (typeof orderTotal !== 'undefined') {
			const entries = Object.entries(orderTotal.toJSON());

			entries.forEach(([key, value]) => {
				setValue(key as keyof BaseOrderTotalRepositorySchema, value);
				formRef.current?.setFieldValue(key, value);
			});
		}
	}, [orderTotal, setValue]);

	return (
		<Form ref={formRef as Ref<FormInstance<any>>} layout='vertical' onFinish={handleSubmit(onSubmit)}>
			<Card
				loading={isLoading || isFetching}
				title={`Redigerar: ${orderTotal?.get('title')}`}
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
				{!!orderTotal?.get('admin_component') && (
					<ComponentProvider componentPath={orderTotal?.get('admin_component')} />
				)}
			</Card>
		</Form>
	);
}
