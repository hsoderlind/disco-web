import { Auth } from "../Auth"
import { LoginSchema } from "../types";

export const useLogin = () => {
	const queryFn = async (data: LoginSchema) => await Auth.login(data);

	return [queryFn] as const;
}
