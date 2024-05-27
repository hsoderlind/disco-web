import { Error as ResponseError } from "@hensod/http-client";

export interface IServerValidationError {
	errors: Record<string, string[]>;
	message: string;
}

export type { ResponseError };

export type ServerValidationError<TData = any> = ResponseError<IServerValidationError, TData>;
