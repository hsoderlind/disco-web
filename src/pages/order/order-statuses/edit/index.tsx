import { SubmitHandler } from 'react-hook-form';
import { useForm } from '../../../../hooks/useForm';
import app from '../../../../lib/application-builder/ApplicationBuilder';
import { ExtractErrors } from '../../../../lib/error/ExtractErrors';
import { queryListOrderStatuses } from '../../../../services/order-status/queries';
import { OrderStatusSchema, orderStatusSchema } from '../../../../services/order-status/types';
import { useShopStore } from '../../../../services/shop/store';
import { Button, Card, Form, FormInstance, Input, InputNumber, Switch } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { CheckOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { useNavigate } from '../../../../hooks/useNavigate';
import { useParams } from 'react-router-dom';
import { RouteParams } from '../../../../types/common';
import { useLoadOrderStatus } from '../../../../services/order-status/hooks/useLoadOrderStatus';
import { Ref, useEffect, useRef } from 'react';
import { useUpdateOrderStatus } from '../../../../services/order-status/hooks/useUpdateOrderStatus';
import { DevTool } from '@hookform/devtools';

export function Component() {
	const navigate = useNavigate();
	const formRef = useRef<FormInstance<any>>();
	const params = useParams<RouteParams>();
	const { data: orderStatus, isFetching, isLoading } = useLoadOrderStatus(+params.id!);
	const shopId = useShopStore((state) => state.shop.id);
	const [queryKey] = queryListOrderStatuses(shopId);
	const {
		control,
		handleSubmit,
		setError,
		reset,
		formState: { isDirty, isSubmitting }
	} = useForm<OrderStatusSchema>({
		schema: orderStatusSchema
	});
	const mutation = useUpdateOrderStatus({
		onSuccess: () => {
			app.addSuccessNotification({ description: 'Orderstatusen har nu uppdaterats.' });
			app.queryClient.invalidateQueries(queryKey);
		},
		onError: (error) => {
			app.addErrorNotification({ description: error.message });
			ExtractErrors.fromServerValidationErrorToFormErrors<OrderStatusSchema>(error)(setError);
		}
	});

	const onSubmit: SubmitHandler<OrderStatusSchema> = async (formValues) => {
		await mutation.mutateAsync(formValues);
		navigate('../', 'Orderstatus');
	};

	useEffect(() => {
		if (typeof orderStatus !== 'undefined') {
			const formValues = orderStatus.toJSON();
			reset(formValues);
			Object.entries(formValues).forEach(([key, value]) => {
				formRef.current?.setFieldValue(key, value);
			});
		}
	}, [orderStatus, reset]);

	return (
		<Form ref={formRef as Ref<FormInstance<any>>} onFinish={handleSubmit(onSubmit)} layout='vertical'>
			<Card
				title='Lägg till orderstatus'
				loading={isFetching || isLoading}
				actions={[
					<Button type='primary' htmlType='submit' icon={<SaveOutlined />} disabled={!isDirty} loading={isSubmitting}>
						Spara
					</Button>
				]}>
				<FormItem control={control} name='name' label='Namn'>
					<Input autoFocus />
				</FormItem>
				<FormItem control={control} name='sort_order' label='Sorteringsordning'>
					<InputNumber min={0} step={1} />
				</FormItem>
				<FormItem
					control={control}
					name='is_default'
					label='Förinställd'
					valuePropName='checked'
					tooltip='Om markerad kommer denna orderstatus användas som förvald orderstatus på kommande beställningar om inget annat har angivits.'>
					<Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
				</FormItem>
			</Card>
			<DevTool control={control} />
		</Form>
	);
}
