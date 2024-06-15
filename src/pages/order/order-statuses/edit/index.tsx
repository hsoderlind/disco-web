import { SubmitHandler } from 'react-hook-form';
import { useForm } from '../../../../hooks/useForm';
import app from '../../../../lib/application-builder/ApplicationBuilder';
import { ExtractErrors } from '../../../../lib/error/ExtractErrors';
import { queryListOrderStatuses } from '../../../../services/order-status/queries';
import { OrderStatusSchema, orderStatusSchema } from '../../../../services/order-status/types';
import { useShopStore } from '../../../../services/shop/store';
import { Button, Card, Form, FormInstance, Input, InputNumber, List, Switch, Typography } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { CheckOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { useNavigate } from '../../../../hooks/useNavigate';
import { useParams } from 'react-router-dom';
import { RouteParams } from '../../../../types/common';
import { useLoadOrderStatus } from '../../../../services/order-status/hooks/useLoadOrderStatus';
import { Ref, useEffect, useRef } from 'react';
import { useUpdateOrderStatus } from '../../../../services/order-status/hooks/useUpdateOrderStatus';
import { DevTool } from '@hookform/devtools';
import { useListActions } from '../../../../services/order-status/hooks/useListActions';
import { ActionRepository } from '../../../../services/order-status/ActionRepository';

export function Component() {
	const navigate = useNavigate();
	const formRef = useRef<FormInstance<any>>();
	const params = useParams<RouteParams>();
	const actionsQuery = useListActions();
	const { data: orderStatus, isFetching, isLoading } = useLoadOrderStatus(+params.id!);
	const shopId = useShopStore((state) => state.shop.id);
	const [queryKey] = queryListOrderStatuses(shopId);
	const {
		control,
		handleSubmit,
		setError,
		setValue,
		getValues,
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

	const handleActionChange = (model: ActionRepository) => (checked: boolean) => {
		if (checked) {
			setValue('actions', [...getValues().actions, { action: model.getKey(), sort_order: 0 }], {
				shouldDirty: true,
				shouldTouch: true
			});
		} else {
			setValue('actions', removeAction(getValues().actions, model.getKey()), { shouldDirty: true, shouldTouch: true });
		}
	};

	const handleSortOrderChange = (model: ActionRepository) => (value: 0 | null) => {
		setValue('actions', updateSortOrder(getValues().actions, model.getKey(), value as number), {
			shouldDirty: true,
			shouldTouch: true
		});
	};

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
				<Typography.Title level={5}>Åtgärder</Typography.Title>
				<List
					bordered
					itemLayout='horizontal'
					loading={actionsQuery.isFetching || actionsQuery.isLoading}
					dataSource={actionsQuery.data?.getItems()}
					renderItem={(model) => (
						<List.Item
							actions={[
								<Form.Item>
									<InputNumber
										min={0}
										defaultValue={
											(orderStatus?.actions().has(model.getKey())
												? orderStatus.actions().find(model.getKey())!.get<number>('sort_order')
												: 0) as 0
										}
										onChange={handleSortOrderChange(model)}
									/>
								</Form.Item>,
								<Form.Item>
									<Switch
										defaultChecked={orderStatus?.actions().has(model.getKey())}
										checkedChildren={<CheckOutlined />}
										unCheckedChildren={<CloseOutlined />}
										onChange={handleActionChange(model)}
									/>
								</Form.Item>
							]}>
							<List.Item.Meta title={model.get('title')} description={model.get('description')} />
						</List.Item>
					)}
				/>
			</Card>
			<DevTool control={control} />
		</Form>
	);
}

function removeAction(value: OrderStatusSchema['actions'], name: string) {
	const newValue = value.filter((entry) => entry.action !== name);

	return newValue;
}

function updateSortOrder(value: OrderStatusSchema['actions'], name: string, sortOrder: number) {
	const newValue = value.map((entry) => {
		if (entry.action === name) {
			entry.sort_order = sortOrder;
		}

		return entry;
	});

	return [...newValue];
}
