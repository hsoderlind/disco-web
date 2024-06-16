import { SubmitHandler } from 'react-hook-form';
import { useForm } from '../../../hooks/useForm';
import app from '../../../lib/application-builder/ApplicationBuilder';
import { ExtractErrors } from '../../../lib/error/ExtractErrors';
import { useUpdateProductStock } from '../../../services/product-stock/hooks/useUpdateProductStock';
import { UpdateProductStockSchema, updateProductStockSchema } from '../../../services/product-stock/types';
import { EditStockProps } from './types';
import { DatePicker, Form, FormInstance, Input, Modal, Switch } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { InputNumber } from '../../../components/forms/controls/input-number';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Ref, useEffect, useRef } from 'react';

export const EditStock = ({ onCancel, open, stock, onUpdated }: EditStockProps) => {
	const formRef = useRef<FormInstance<any>>();
	const {
		control,
		handleSubmit,
		setError,
		reset,
		formState: { isDirty, isSubmitting }
	} = useForm({
		defaultValues: { ...stock, adjusted_quantity: 0 } || {},
		schema: updateProductStockSchema
	});
	const mutation = useUpdateProductStock(stock?.id, {
		onSuccess: (model) => {
			app.addSuccessNotification({ description: 'Lagret har nu uppdaterats' });
			onUpdated?.(model);
		},
		onError: (error) => {
			app.addErrorNotification({ description: error.message });
			ExtractErrors.fromServerValidationErrorToFormErrors<UpdateProductStockSchema>(error)(setError);
		}
	});

	const onSubmit: SubmitHandler<UpdateProductStockSchema> = (formValues) => mutation.mutateAsync(formValues);

	useEffect(() => {
		if (stock !== null) {
			reset(stock);
			Object.entries(stock).forEach(([key, value]) => {
				formRef.current?.setFieldValue(key, value);
			});
		}
	}, [stock, reset]);

	return (
		<Modal
			title='Uppdatera lager'
			open={open}
			okText='Spara & stäng'
			okButtonProps={{ disabled: !isDirty, loading: isSubmitting }}
			onOk={handleSubmit(onSubmit)}
			cancelText='Stäng'
			cancelButtonProps={{ disabled: isSubmitting }}
			onCancel={onCancel}>
			<Form ref={formRef as Ref<FormInstance<any>>} layout='vertical'>
				<FormItem control={control} name='sku' label='Lagerplats'>
					<Input />
				</FormItem>
				<FormItem control={control} name='adjusted_quantity' label='Justera lagersaldo'>
					<InputNumber />
				</FormItem>
				<FormItem control={control} name='available_at' label='Tillgänglig från'>
					<DatePicker />
				</FormItem>
				<FormItem
					control={control}
					name='allow_order_out_of_stock'
					label='Tillåt beställning vid slutsåld'
					valuePropName='checked'>
					<Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
				</FormItem>
				<FormItem control={control} name='out_of_stock_message' label='Meddelande vid slutsåld'>
					<Input />
				</FormItem>
				<FormItem
					control={control}
					name='send_email_out_of_stock'
					label='Skicka e-post vid slutsåld'
					tooltip='Få ett e-postmeddelande när produkten blir slutsåld'
					valuePropName='checked'>
					<Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
				</FormItem>
				<FormItem
					control={control}
					name='min_order_quantity'
					label='Minsta beställningsantal'
					tooltip='Ange det minsta antal som går att beställa av denna produkt.'>
					<InputNumber />
				</FormItem>
				<FormItem control={control} name='in_stock_message' label='Meddelande vid i lager'>
					<Input />
				</FormItem>
			</Form>
		</Modal>
	);
};
