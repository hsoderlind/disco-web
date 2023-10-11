import { Error } from "@hensod/HttpClient";

export interface IServerValidationError {
	errors: Record<string, string[]>;
	message: string;
}

export type ServerValidationError<TData = any> = Error<IServerValidationError, TData>;
