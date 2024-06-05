import { SubmitHandler, UseFormProps, useWatch } from "react-hook-form";
import { CreateOrderSchema, createOrderSchema } from "../types";
import { useForm } from "../../../hooks/useForm";
import { useEffect, useState } from "react";
import { OrderForm } from "../OrderForm";

export const useOrderForm = (defaultValues?: UseFormProps<CreateOrderSchema>['defaultValues']) => {
	const [orderForm] = useState(OrderForm.make(defaultValues as CreateOrderSchema));

	const methods = useForm<CreateOrderSchema>({
		defaultValues,
		schema: createOrderSchema
	});
	const formValues = useWatch({control: methods.control});

	const onSubmit: SubmitHandler<CreateOrderSchema> = (formValues) => console.log('submitted values', formValues);

	useEffect(() => {
		console.log('formValues', formValues);
		orderForm.fill(formValues as CreateOrderSchema);
	}, [formValues, orderForm]);

	return [methods, onSubmit, orderForm] as const;
}
