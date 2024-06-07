import { SubmitHandler, UseFormProps, useWatch } from "react-hook-form";
import { CreateOrderSchema, createOrderSchema } from "../types";
import { useForm } from "../../../hooks/useForm";
import { useEffect, useState } from "react";
import { OrderForm } from "../OrderForm";
import { useShopStore } from "../../shop/store";
import { useCreateOrder } from "./useCreateOrder";
import app from "../../../lib/application-builder/ApplicationBuilder";
import { ExtractErrors } from "../../../lib/error/ExtractErrors";

export const useOrderForm = (defaultValues?: UseFormProps<CreateOrderSchema>['defaultValues']) => {
	const shopId = useShopStore(state => state.shop.id);
	const [orderForm] = useState(OrderForm.make(defaultValues as CreateOrderSchema, shopId));

	const methods = useForm<CreateOrderSchema>({
		defaultValues,
		schema: createOrderSchema
	});
	const formValues = useWatch({control: methods.control});

	const mutation = useCreateOrder({
		onSuccess: () => {
			app.addSuccessNotification({description: 'Beställningen har nu skapats.'})
		},
		onError: (error) => {
			app.addErrorNotification({description: error.message});
			ExtractErrors.fromServerValidationErrorToFormErrors<CreateOrderSchema>(error)(methods.setError);
		}
	});

	const onSubmit: SubmitHandler<CreateOrderSchema> = (formValues) => mutation.mutateAsync(formValues);

	useEffect(() => {
		orderForm.fill(formValues as CreateOrderSchema);
	}, [formValues, orderForm]);

	return [methods, onSubmit, orderForm] as const;
}
