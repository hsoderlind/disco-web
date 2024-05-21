import { FormProvider, SubmitHandler } from 'react-hook-form';
import { useForm } from '../../../../../hooks/useForm';
import { LogotypeProps, LogotypeSchema, logotypeSchema } from '../types';
import { Typography } from 'antd';
import { LogotypeUpload } from './upload';

export const Logotype = ({ className, onUploaded, title, defaultValue = null!, ...uploadProps }: LogotypeProps) => {
	const methods = useForm<LogotypeSchema>({
		defaultValues: { logotype: defaultValue },
		schema: logotypeSchema
	});

	const { handleSubmit } = methods;

	const onSubmit: SubmitHandler<LogotypeSchema> = (formValues) => {
		onUploaded(formValues.logotype[0]);
	};

	return (
		<FormProvider {...methods}>
			<div className={className}>
				{title && <Typography.Title level={3}>{title}</Typography.Title>}
				<LogotypeUpload {...uploadProps} onUploaded={() => handleSubmit(onSubmit)()} />
			</div>
		</FormProvider>
	);
};
