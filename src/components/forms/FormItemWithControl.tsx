import { Form } from 'antd';
import { Children, ComponentProps, ReactNode, cloneElement, isValidElement, useEffect } from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

type AntdFormItemProps = ComponentProps<typeof Form.Item>;

export type FormItemWithControlProps<TFieldValues extends FieldValues = FieldValues> = {
	children: ReactNode;
	control: Control<TFieldValues>;
	name: FieldPath<TFieldValues>;
	disabled?: boolean;
} & Omit<AntdFormItemProps, 'name' | 'rules' | 'validateStatus'>;

export const FormItemWithControl = <TFieldValues extends FieldValues = FieldValues>({
	children,
	control,
	name,
	disabled,
	help,
	valuePropName,
	...props
}: FormItemWithControlProps<TFieldValues>) => {
	const { field, fieldState } = useController({ control, name, disabled });
	const form = Form.useFormInstance();

	useEffect(() => {
		form.setFieldValue(name, field.value);
	}, [field.value, name, form]);

	return (
		<Form.Item
			{...props}
			//@ts-expect-error Ant Design form item name type safe is not necessary here
			name={name}
			initialValue={field.value}
			validateStatus={fieldState.invalid ? 'error' : undefined}
			help={fieldState.error?.message ?? help}>
			{Children.map(
				children,
				(child) =>
					isValidElement(child) &&
					cloneElement(child, {
						...field,
						...(control && { control }),
						//@ts-expect-error onChange type safe is not necessary here
						onChange: (...params) => {
							child.props.onChange && child.props.onChange(...params);
							field.onChange(...params);
						},
						onBlur: () => {
							child.props.onBlur && child.props.onBlur();
							field.onBlur();
						},
						...(valuePropName && {
							[valuePropName]: field.value
						})
					})
			)}
		</Form.Item>
	);
};
