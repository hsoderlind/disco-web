import app from "../../lib/application-builder/ApplicationBuilder";
import { passwordMatcher, vsbInfer } from "../../lib/validation/validation-schema-builder";

const vsb = app.getValidationSchemaBuilder();

export const loginSchema = vsb.object({
	email: vsb.string().email().nonempty(),
	password: vsb.string().min(6).nonempty(),
});

export type LoginSchema = vsbInfer<typeof loginSchema>;

export const registerSchema = vsb.object({
	name: vsb.string().nonempty(),
	email: vsb.string().email().nonempty(),
	password: vsb.string().min(8).nonempty(),
	password_confirmation: vsb.string().min(8).nonempty(),
}).superRefine(passwordMatcher);

export type RegisterSchema = vsbInfer<typeof registerSchema>;

export const forgotPasswordSchema = vsb.object({
	email: vsb.string().email().nonempty(),
});

export type ForgotPasswordSchema = vsbInfer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = vsb.object({
	password: vsb.string().min(8).nonempty(),
	password_confirmation: vsb.string().min(8).nonempty(),
}).superRefine(passwordMatcher);

export type ResetPasswordSchema = vsbInfer<typeof resetPasswordSchema>;

export type ResetPasswordData = ResetPasswordSchema & {
	email: string;
	token: string;
};
