import { FC } from 'react';
import { useShopStore } from '../../services/shop/store';
import { useForm } from '../../hooks/useForm';
import { AttributeValueSchemaType, attributeValueSchema } from '../../services/product-attribute/types';
import { useCreateAttributeValue } from '../../services/product-attribute/hooks/useCreateAttributeValue';
import { useMutation } from '@tanstack/react-query';
import { AttributeValue } from '../../services/product-attribute/AttributeValue';
import { ServerValidationError } from '../../lib/error/types';
import app from '../../lib/application-builder/ApplicationBuilder';
import { ExtractErrors } from '../../lib/error/ExtractErrors';
import { SubmitHandler } from 'react-hook-form';
import { Form, Input, InputNumber, Modal } from 'antd';
import FormItem from '../../lib/form/FormItem';

export type CreateAttributeValueModalProps = {
	attributeTypeId: number;
	open: boolean;
	onCancel?: () => void;
	onFinish?: (attributeValue: AttributeValue) => void;
};

export const CreateAttributeValueModal: FC<CreateAttributeValueModalProps> = ({
	attributeTypeId,
	open,
	onCancel,
	onFinish
}) => {
	const shopId = useShopStore((state) => state.shop.id);
	const { control, handleSubmit, setError } = useForm<AttributeValueSchemaType>({
		defaultValues: {
			label: '',
			sort_order: 0,
			attribute_type_id: attributeTypeId
		},
		schema: attributeValueSchema
	});

	const [mutationFn] = useCreateAttributeValue(shopId);
	const mutation = useMutation<AttributeValue, ServerValidationError, AttributeValueSchemaType>(mutationFn, {
		onSuccess(data) {
			app.addSuccessNoitication({ description: 'Attributvärdet har nu skapats.' });
			onFinish?.(data);
		},
		onError(error) {
			ExtractErrors.fromServerValidationErrorToFormErrors<AttributeValueSchemaType>(error)(setError);
			app.addErrorNoitication({ description: error.message });
		}
	});

	const onSubmit: SubmitHandler<AttributeValueSchemaType> = (values) => {
		mutation.mutate(values);
	};

	return (
		<Modal open={open} cancelText='Stäng' okText='Spara & stäng' onCancel={onCancel} onOk={handleSubmit(onSubmit)}>
			<Form layout='vertical'>
				<FormItem control={control} name='label' label='Benämning'>
					<Input autoFocus />
				</FormItem>
				<FormItem control={control} name='sort_order' label='Sorteringsordning'>
					<InputNumber min={0} />
				</FormItem>
			</Form>
		</Modal>
	);
};
