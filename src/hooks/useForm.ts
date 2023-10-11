import { useForm as RHF_useForm, FieldValues, UseFormProps, UseFormReturn } from "react-hook-form";
import formResolver from '../lib/validation/form-resolver';
import { Schema } from "../lib/validation/validation-schema-builder";

export type UseFormFunction = <TFieldValues extends FieldValues = FieldValues, TContext = any, TTransformedValues extends FieldValues | undefined = undefined>(props: UseFormProps<TFieldValues, TContext> & {schema: Schema}) => UseFormReturn<TFieldValues, TContext, TTransformedValues>;

export const useForm: UseFormFunction = (props) => {
	const {schema, ...rest} = props;
	return RHF_useForm({
		...rest,
		resolver: formResolver(schema)
	});
}
