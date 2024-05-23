import { useForm } from '../../../../../hooks/useForm';
import { ShopUserSchema, shopUserSchema } from '../../../../../services/shop/types';
import { CreateUserProps } from './types';

export const CreateUser = ({ open, onCancel, onCreated }: CreateUserProps) => {
	const {
		control,
		handleSubmit,
		setError,
		formState: { isDirty, isSubmitting }
	} = useForm<ShopUserSchema>({
		defaultValues: {
			name: '',
			email: '',
			roles: []
		},
		schema: shopUserSchema
	});
};
