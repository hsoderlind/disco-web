import { Auth } from "../Auth"
import { ForgotPasswordSchema } from "../types"

export const useSendResetPasswordLink = () => {
	const queryFn = async (data: ForgotPasswordSchema) => await Auth.sendPasswordResetLink(data);

	return [queryFn] as const;
}
