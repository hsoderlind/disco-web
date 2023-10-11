import { Auth } from "../Auth";
import { RegisterSchema } from "../types";

export const useRegisterUser = () => {
	const queryFn = async (data: RegisterSchema) => await Auth.register(data);

	return [queryFn] as const;
};
