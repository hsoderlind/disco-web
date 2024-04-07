import { FC } from 'react';
import { useShopStore } from '../../services/shop/store';
import { useForm } from '../../hooks/useForm';
import { AttributeTyoeSchemaType, attributeTypeSchema } from '../../services/product-attribute/types';
import { useMutation } from '@tanstack/react-query';
import { ServerValidationError } from '../../lib/error/types';
import { AttributeType } from '../../services/product-attribute/AttributeType';
import app from '../../lib/application-builder/ApplicationBuilder';
import { ExtractErrors } from '../../lib/error/ExtractErrors';
import { useCreateAttributeType } from '../../services/product-attribute/hooks/useCreateAttributeType';
import { SubmitHandler } from 'react-hook-form';
import { Form, Input, Modal, Switch } from 'antd';
import FormItem from '../../lib/form/FormItem';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

export type CreateAttributeTypeModalProps = {
	open: boolean;
	onCancel?: () => void;
	onFinish?: () => void;
};

export const CreateAttributeTypeModal: FC<CreateAttributeTypeModalProps> = ({ open, onCancel, onFinish }) => {
	const shopId = useShopStore((state) => state.shop.id);
	const { control, handleSubmit, setError } = useForm<AttributeTyoeSchemaType>({
		defaultValues: {
			active: true,
			label: ''
		},
		schema: attributeTypeSchema
	});

	const [mutationFn] = useCreateAttributeType(shopId);
	const mutation = useMutation<AttributeType, ServerValidationError, AttributeTyoeSchemaType>(mutationFn, {
		onSuccess() {
			app.addSuccessNoitication({ description: 'Attributtypen har nu skapats.' });
			onFinish?.();
		},
		onError(error) {
			ExtractErrors.fromServerValidationErrorToFormErrors<AttributeTyoeSchemaType>(error)(setError);
		}
	});

	const onSubmit: SubmitHandler<AttributeTyoeSchemaType> = (values) => {
		mutation.mutate(values);
	};

	return (
		<Modal open={open} cancelText='Stäng' okText='Spara & stäng' onCancel={onCancel} onOk={handleSubmit(onSubmit)}>
			<Form layout='vertical'>
				<FormItem control={control} name='label' label='Benämning'>
					<Input autoFocus />
				</FormItem>
				<FormItem control={control} name='active' label='Aktiv' valuePropName='checked'>
					<Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
				</FormItem>
			</Form>
		</Modal>
	);
};
