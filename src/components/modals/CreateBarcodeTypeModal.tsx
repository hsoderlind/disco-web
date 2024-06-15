import { FC, useState } from 'react';
import { useShopStore } from '../../services/shop/store';
import { useForm } from '../../hooks/useForm';
import { BarcodeTypeSchemaType, barcodeTypeSchema } from '../../services/barcode-type/types';
import { useCreateBarcodeType } from '../../services/barcode-type/hooks/useCreateBarcodeType';
import { useMutation } from '@tanstack/react-query';
import { BarcodeType } from '../../services/barcode-type/BarcodeType';
import { ServerValidationError } from '../../lib/error/types';
import app from '../../lib/application-builder/ApplicationBuilder';
import { ExtractErrors } from '../../lib/error/ExtractErrors';
import { SubmitHandler } from 'react-hook-form';
import { AutoComplete, Form, Input, Modal, Switch } from 'antd';
import FormItem from '../../lib/form/FormItem';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { DEFAULT_FORMAT, DEFAULT_FORMATS } from '../../services/barcode-type/formats';
import { InputNumber } from '../forms/controls/input-number';

export type CreateBarcodeTypeModalProps = {
	open: boolean;
	onCancel?: () => void;
	onFinish?: (barcodeType: BarcodeType) => void;
};

export const CreateBarcodeTypeModal: FC<CreateBarcodeTypeModalProps> = ({ open, onCancel, onFinish }) => {
	const [formatOptions] = useState(DEFAULT_FORMATS.map((format) => ({ label: format, value: format })));
	const shopId = useShopStore((state) => state.shop.id);
	const { control, handleSubmit, setError } = useForm<BarcodeTypeSchemaType>({
		defaultValues: {
			label: '',
			format: DEFAULT_FORMAT,
			sort_order: 0,
			active: true
		},
		schema: barcodeTypeSchema
	});

	const [mutationFn] = useCreateBarcodeType(shopId);
	const mutation = useMutation<BarcodeType, ServerValidationError, BarcodeTypeSchemaType>(mutationFn, {
		onSuccess(response) {
			app.addSuccessNotification({ description: 'Produktkodstypen har nu skapats.' });
			onFinish?.(response);
		},
		onError(error) {
			ExtractErrors.fromServerValidationErrorToFormErrors<BarcodeTypeSchemaType>(error)(setError);
		}
	});

	const onSubmit: SubmitHandler<BarcodeTypeSchemaType> = (values) => {
		mutation.mutate(values);
	};

	return (
		<Modal open={open} cancelText='Stäng' okText='Spara & stäng' onCancel={onCancel} onOk={handleSubmit(onSubmit)}>
			<Form layout='vertical'>
				<FormItem control={control} name='label' label='Benämning'>
					<Input autoFocus />
				</FormItem>
				<FormItem control={control} name='format' label='Format'>
					<AutoComplete options={formatOptions} />
				</FormItem>
				<FormItem control={control} name='sort_order' label='Sorteringsordning'>
					<InputNumber min={0} />
				</FormItem>
				<FormItem control={control} name='active' label='Aktiv' valuePropName='checked'>
					<Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
				</FormItem>
			</Form>
		</Modal>
	);
};
