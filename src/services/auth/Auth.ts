import { makeHttpClientForApi } from "../../lib/http/http";
import { Message } from "../../types/common";
import { LoginSchema, RegisterSchema, ForgotPasswordSchema, ResetPasswordData } from "./types";

export abstract class Auth {
	static readonly CSRF_TOKEN_URI = '/sanctum/csrf-cookie';
	static readonly LOGIN_URI = '/login';
	static readonly LOGOUT_URI = '/logout';
	static readonly REGISTER_URI = '/register';
	static readonly FORGOT_PASSWORD_URI = '/forgot-password';
	static readonly RESET_PASSWORD_URI = '/reset-password';

	static async fetchCsrfToken() {
		const httpClient = makeHttpClientForApi();
		await httpClient.get(this.CSRF_TOKEN_URI);
	}

	static async login(data: LoginSchema) {
		const httpClient = makeHttpClientForApi();
		await httpClient.post(this.LOGIN_URI, data);
	}

	static async logout() {
		const HttpClient = makeHttpClientForApi();
		await HttpClient.post(this.LOGOUT_URI);
	}

	static async register(data: RegisterSchema) {
		const httpClient = makeHttpClientForApi();
		await httpClient.post(this.REGISTER_URI, data);
	}

	static async sendPasswordResetLink(data: ForgotPasswordSchema) {
		const httpClient = makeHttpClientForApi();
		const response = await httpClient.post<ForgotPasswordSchema, Message>(this.FORGOT_PASSWORD_URI, data);
		return response.data;
	}

	static async resetPassword(data: ResetPasswordData) {
		const httpClient = makeHttpClientForApi();
		const response = await httpClient.post<ResetPasswordData, Message>(this.RESET_PASSWORD_URI, data);
		return response.data;
	}
}
