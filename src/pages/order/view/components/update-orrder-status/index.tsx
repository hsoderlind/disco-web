import { SubmitHandler } from 'react-hook-form';
import { useForm } from '../../../../../hooks/useForm';
import app from '../../../../../lib/application-builder/ApplicationBuilder';
import { ExtractErrors } from '../../../../../lib/error/ExtractErrors';
import { useUpdateOrderStatus } from '../../../../../services/order/hooks/useUpdateOrderStatus';
import { CreateOrderStatusHistorySchema, createOrderStatusHistorySchema } from '../../../../../services/order/types';
import { UpdateOrderStatusProps } from './types';
import { Form, Input, Modal } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { OrderStatusSelect } from '../../../../../components/forms/controls/order-status-select';

type FormValues = Omit<CreateOrderStatusHistorySchema, 'order_id'>;

export const UpdateOrderStatus = ({ onCancel, onUpdated, open, orderId }: UpdateOrderStatusProps) => {
	const {
		control,
		handleSubmit,
		setError,
		formState: { isDirty, isSubmitting }
	} = useForm<FormValues>({ schema: createOrderStatusHistorySchema });

	const mutation = useUpdateOrderStatus(orderId, {
		onSuccess: () => {
			app.addSuccessNotification({ description: 'Beställningens status har nu uppdaterats.' });
			onUpdated?.();
		},
		onError: (error) => {
			app.addErrorNotification({ description: error.message });
			ExtractErrors.fromServerValidationErrorToFormErrors<FormValues>(error)(setError);
		}
	});

	const onSubmit: SubmitHandler<FormValues> = (formValues) => mutation.mutateAsync(formValues);

	return (
		<Modal
			open={open}
			title='Uppdatera orderstatus'
			onOk={handleSubmit(onSubmit)}
			okText='Spara & stäng'
			okButtonProps={{ disabled: !isDirty, loading: isSubmitting }}
			onCancel={onCancel}
			cancelText='Stäng'
			cancelButtonProps={{ disabled: isSubmitting }}>
			<Form layout='vertical'>
				<FormItem control={control} name='order_status_id' label='Ny status'>
					<OrderStatusSelect />
				</FormItem>
				<FormItem control={control} name='note' label='Anteckning'>
					<Input.TextArea rows={3} />
				</FormItem>
				<FormItem control={control} name='mail_content' label='E-postmeddelande'>
					<Input.TextArea rows={8} />
				</FormItem>
			</Form>
		</Modal>
	);
};
