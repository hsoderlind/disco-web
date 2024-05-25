import { SubmitHandler } from 'react-hook-form';
import { useForm } from '../../../../../hooks/useForm';
import app from '../../../../../lib/application-builder/ApplicationBuilder';
import { ExtractErrors } from '../../../../../lib/error/ExtractErrors';
import { useUpdateShopUser } from '../../../../../services/shop/hooks/useUpdateShopUser';
import { ShopUserSchema, shopUserSchema } from '../../../../../services/shop/types';
import { EditShopUserProps } from './types';
import { Alert, Form, Input, Modal } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { RoleSelect } from '../../../../../components/forms/controls/role-select';
import { useShopStore } from '../../../../../services/shop/store';

export const EditShopUser = ({ shopUser, open, onCancel, onUpdated }: EditShopUserProps) => {
	const shopUserIsRegistered = shopUser.state === 'REGISTERED';

	const shopOwnerId = useShopStore((state) => state.shop.account_owner);

	const {
		control,
		handleSubmit,
		setError,
		formState: { isDirty, isSubmitting }
	} = useForm<ShopUserSchema>({
		defaultValues: { ...shopUser, roles: shopUser.roles.map((role) => role.id) },
		schema: shopUserSchema
	});
	const mutation = useUpdateShopUser(shopUser.id, {
		onSuccess: (data) => {
			app.addSuccessNotification({ description: 'Användaren har nu uppdaterats' });

			onUpdated?.(data);
		},
		onError: (error) => {
			ExtractErrors.fromServerValidationErrorToFormErrors<ShopUserSchema>(error)(setError);
		}
	});

	const onSubmit: SubmitHandler<ShopUserSchema> = (formValues) => mutation.mutateAsync(formValues);

	return (
		<Modal
			open={open}
			title={`Redigera: ${shopUser.name}`}
			onOk={handleSubmit(onSubmit)}
			okText='Spara & stäng'
			okButtonProps={{ disabled: !isDirty, loading: isSubmitting }}
			onCancel={onCancel}
			cancelText='Avbryt'
			cancelButtonProps={{ disabled: isSubmitting }}>
			{shopUserIsRegistered && (
				<Alert
					className='mb-4'
					type='warning'
					message='Användaren är registrerad'
					description='En registrerad användare äger sin information. Detta innebär att du inte kan redigera användarens uppgifter utan endast användaren själv kan ändra dessa under sin profil.'
				/>
			)}
			<Form layout='vertical'>
				<FormItem control={control} name='name' label='Namn'>
					<Input disabled={shopUserIsRegistered} />
				</FormItem>
				<FormItem control={control} name='email' label='E-post'>
					<Input type='email' disabled={shopUserIsRegistered} />
				</FormItem>
				<FormItem control={control} name='roles' label='Roll(er)'>
					<RoleSelect showAccountOwner={shopOwnerId === shopUser.id} mode='multiple' allowClear />
				</FormItem>
			</Form>
		</Modal>
	);
};
