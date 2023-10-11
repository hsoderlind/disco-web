import { ServerValidationError } from './types';
import { UseFormSetError, FieldValues } from 'react-hook-form';

export abstract class ExtractErrors {
	public static fromServerValidationError<TData = any>(error: ServerValidationError<TData>) {
		const { response } = error;
		if (response) {
			const { data } = response;
			if (data) {
				const { errors } = data;
				if (errors) {
					return errors;
				}
			}
		}
		return null;
	}

	public static fromServerValidationErrorToFormErrors<TFieldValues extends FieldValues, TData = any>(error: ServerValidationError<TData>) {
		const formErrors = ExtractErrors.fromServerValidationError<TData>(error);
		return (setError: UseFormSetError<TFieldValues>) => {
			if (formErrors) {
				Object.entries<string[]>(formErrors).forEach(([key, value]) => {
					setError(key as any, { message: value[0] });
				});
			}
		}
	}
}
