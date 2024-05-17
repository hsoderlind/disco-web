import { SubmitHandler } from 'react-hook-form';
import { useForm } from '../../../../../../hooks/useForm';
import { useLoaderData } from '../../../../../../hooks/useLoaderData';
import app from '../../../../../../lib/application-builder/ApplicationBuilder';
import { ExtractErrors } from '../../../../../../lib/error/ExtractErrors';
import { Customer } from '../../../../../../services/customer/Customer';
import { useAdjustCreditBalance } from '../../../../../../services/customer/hooks/useAdjustCreditBalance';
import { CreditBalanceSchema, creditBalanceSchema } from '../../../../../../services/customer/types';
import { CreditBalanceFormProps } from './types';
import { FormItem } from 'react-hook-form-antd';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { AdjustmentTypes } from '../../../../../../services/customer/AdjustmentTypes';
import { ButtonBar } from '../../../../../../components/forms/buttonbar';

export const CreditBalanceForm = ({ onAfterAdjustment, onCancel }: CreditBalanceFormProps) => {
	const customer = useLoaderData<Customer>();
	const {
		control,
		handleSubmit,
		setError,
		formState: { isDirty, isSubmitting }
	} = useForm<CreditBalanceSchema>({
		defaultValues: {
			adjusted_balance: 0,
			adjustment_type: AdjustmentTypes.CREDIT,
			note: ''
		},
		schema: creditBalanceSchema
	});

	const mutation = useAdjustCreditBalance(customer.getKey()!, {
		onSuccess: (creditBalance) => {
			app.addSuccessNotification({ description: 'Kreditsaldot är nu uppdaterat.' });
			onAfterAdjustment?.(creditBalance);
		},
		onError: (error) => {
			ExtractErrors.fromServerValidationErrorToFormErrors<CreditBalanceSchema>(error)(setError);
			app.addErrorNotification({ description: error.message });
		}
	});

	const onSubmit: SubmitHandler<CreditBalanceSchema> = (values) => mutation.mutateAsync(values);

	return (
		<Form layout='vertical' onFinish={handleSubmit(onSubmit)} className='pt-5'>
			<FormItem control={control} name='adjustment_type' label='Justeringstyp'>
				<Select
					options={[
						{
							value: AdjustmentTypes.CREDIT,
							label: 'Kredit'
						},
						{
							value: AdjustmentTypes.DEBET,
							label: 'Debet'
						}
					]}
				/>
			</FormItem>
			<FormItem control={control} name='adjusted_balance' label='Belopp'>
				<InputNumber precision={2} min={0} addonAfter='kr' />
			</FormItem>
			<FormItem control={control} name='note' label='Anteckning'>
				<Input.TextArea rows={4} />
			</FormItem>
			<ButtonBar size='narrow'>
				<Button onClick={onCancel}>Avbryt</Button>
				<Button htmlType='submit' type='primary' disabled={!isDirty} loading={isSubmitting}>
					Tillämpa kreditsaldo
				</Button>
			</ButtonBar>
		</Form>
	);
};
