import { SubmitHandler } from 'react-hook-form';
import { useForm } from '../../../../hooks/useForm';
import app from '../../../../lib/application-builder/ApplicationBuilder';
import { ExtractErrors } from '../../../../lib/error/ExtractErrors';
import { useCreateOrderStatus } from '../../../../services/order-status/hooks/useCreateOrderStatus';
import { queryListOrderStatuses } from '../../../../services/order-status/queries';
import { OrderStatusSchema, orderStatusSchema } from '../../../../services/order-status/types';
import { useShopStore } from '../../../../services/shop/store';
import { Button, Card, Form, Input, Switch } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { CheckOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { useNavigate } from '../../../../hooks/useNavigate';
import { InputNumber } from '../../../../components/forms/controls/input-number';

export function Component() {
	const navigate = useNavigate();
	const shopId = useShopStore((state) => state.shop.id);
	const [queryKey] = queryListOrderStatuses(shopId);
	const {
		control,
		handleSubmit,
		setError,
		formState: { isDirty, isSubmitting }
	} = useForm<OrderStatusSchema>({
		defaultValues: { is_default: false },
		schema: orderStatusSchema
	});
	const mutation = useCreateOrderStatus({
		onSuccess: () => {
			app.addSuccessNotification({ description: 'Orderstatusen har nu skapats.' });
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

	return (
		<Form onFinish={handleSubmit(onSubmit)} layout='vertical'>
			<Card
				title='Lägg till orderstatus'
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
		</Form>
	);
}
