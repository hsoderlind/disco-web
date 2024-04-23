import { FC } from 'react';
import { useShopStore } from '../../services/shop/store';
import { useCreateTaxClass } from '../../services/tax/hooks/useCreateTaxClass';
import { useForm } from '../../hooks/useForm';
import { TaxSchemaType, taxSchema } from '../../services/tax/types';
import { useMutation } from '@tanstack/react-query';
import { Tax } from '../../services/tax/Tax';
import { ServerValidationError } from '../../lib/error/types';
import { ExtractErrors } from '../../lib/error/ExtractErrors';
import { SubmitHandler } from 'react-hook-form';
import { Form, Input, InputNumber, Modal, Switch } from 'antd';
import FormItem from '../../lib/form/FormItem';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import app from '../../lib/application-builder/ApplicationBuilder';

export type CreateTaxClassModalProps = {
	open: boolean;
	onCancel?: () => void;
	onFinish?: () => void;
};

export const CreateTaxClassModal: FC<CreateTaxClassModalProps> = ({ open, onFinish, onCancel }) => {
	const shopId = useShopStore((state) => state.shop.id);
	const { control, handleSubmit, setError } = useForm<TaxSchemaType>({
		defaultValues: {
			active: true,
			name: '',
			priority: 0,
			value: 0
		},
		schema: taxSchema
	});
	const [mutationFn] = useCreateTaxClass(shopId);
	const mutation = useMutation<Tax, ServerValidationError, TaxSchemaType>(mutationFn, {
		onSuccess() {
			app.addSuccessNoitication({ description: 'Momsklassen har nu skapats.' });
			onFinish?.();
		},
		onError(error) {
			ExtractErrors.fromServerValidationErrorToFormErrors<TaxSchemaType>(error)(setError);
			app.addErrorNoitication({ description: error.message });
		}
	});

	const onSubmit: SubmitHandler<TaxSchemaType> = (values) => {
		mutation.mutate(values);
	};

	return (
		<Modal
			open={open}
			cancelText='Stäng'
			okText='Spara & stäng'
			title='Skapa momsklass'
			onCancel={onCancel}
			onOk={handleSubmit(onSubmit)}>
			<Form layout='vertical'>
				<FormItem control={control} name='name' label='Namn'>
					<Input autoFocus autoComplete='off' />
				</FormItem>
				<FormItem control={control} name='value' label='Värde'>
					<InputNumber addonBefore='+' addonAfter='%' min={0} decimalSeparator=',' />
				</FormItem>
				<FormItem control={control} name='priority' label='Prioritet'>
					<InputNumber addonBefore='+' min={0} />
				</FormItem>
				<FormItem control={control} name='active' label='Aktiv' valuePropName='checked'>
					<Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
				</FormItem>
			</Form>
		</Modal>
	);
};
