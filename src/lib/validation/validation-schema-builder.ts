import dayjs, { Dayjs } from 'dayjs';
import * as z from 'zod';
import { makeZodI18nMap } from 'zod-i18n-map';

export type ValidationSchemaBuilder = typeof z;

export type vsbInfer<T extends z.ZodType<any, any, any>> = z.infer<T>;

export type Schema = z.ZodType;

export type PasswordMatch = {
	password: string;
	password_confirmation: string;
}

type PasswordMatchFn<T extends PasswordMatch> = (arg: T, ctx: z.RefinementCtx) => void;

export const initValidationSchemaBuilder = (): ValidationSchemaBuilder => {
	z.setErrorMap(makeZodI18nMap({ns: 'formValidation'}))
	return z;
};

export const passwordMatcher: PasswordMatchFn<PasswordMatch> = (arg, ctx) => {
	if (arg.password !== arg.password_confirmation) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Lösenorden matchar inte',
			path: ['password_confirmation']
		})
	}
}

export const isDayJs = z.instanceof(dayjs as unknown as typeof Dayjs);

export const id = z.number().int().nonnegative();

export const sortOrder = z.number().int().nonnegative();

export const emptyRecord = z.record(z.never());

export const emptyObject = z.object({});

export type EmptyRecord = z.infer<typeof emptyRecord>;

export type EmptyObject = z.infer<typeof emptyObject>;

