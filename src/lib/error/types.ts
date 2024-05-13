import { Error as ResponseError } from "@hensod/HttpClient";

export interface IServerValidationError {
	errors: Record<string, string[]>;
	message: string;
}

export type { ResponseError };

export type ServerValidationError<TData = any> = ResponseError<IServerValidationError, TData>;
