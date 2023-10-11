import { Auth } from "../Auth";
import { ResetPasswordSchema } from "../types"

export const useResetPassword = () => {
	const queryFn = async (values: ResetPasswordSchema) => {
		const params = new URLSearchParams(window.location.search);
		const token = params.get('token')!;
		const email = params.get('email')!;
		const data = { ...values, token, email };
		return await Auth.resetPassword(data);
	}

	return [queryFn] as const;
}
