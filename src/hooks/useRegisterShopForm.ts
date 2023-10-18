import Shop from "../services/shop/Shop";
import { useCreateShop } from "../services/shop/hooks/useCreateShop";
import { useForm } from "./useForm";
import { useMutation } from "@tanstack/react-query";
import { ShopSchema, shopSchema } from "../services/shop/types";
import { ExtractErrors } from "../lib/error/ExtractErrors";
import { ServerValidationError } from "../lib/error/types";
import { SubmitHandler } from 'react-hook-form';

export type RegisterShopModalFormConfig = {
	onAfterCreate?: (shop: Shop) => void;
};

const useRegisterShopForm = ({onAfterCreate}: RegisterShopModalFormConfig) => {
	const [mutationFn] = useCreateShop();
	const { control, handleSubmit, setError } = useForm<ShopSchema>({
		defaultValues: {
			name: '',
			orgnumber: '',
			address_street1: '',
			address_street2: '',
			address_zip: '',
			address_city: ''
		},
		schema: shopSchema
	});

	const mutation = useMutation<Shop, ServerValidationError, ShopSchema>(mutationFn, {
		onSuccess: (data) => {
			onAfterCreate?.(data);
		},
		onError: (error) => {
			ExtractErrors.fromServerValidationErrorToFormErrors<ShopSchema>(error)(setError);
		}
	});

	const onSubmit: SubmitHandler<ShopSchema> = (values) => {
		mutation.mutate(values);
	};

	return {control, onSubmit: handleSubmit(onSubmit)} as const;
}

export default useRegisterShopForm;
