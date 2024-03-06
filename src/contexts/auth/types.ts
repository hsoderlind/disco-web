import { User } from '../../services/user/User';

export interface AuthContext {
	isFetchingCsrfToken: boolean;
	isAuthenticating: boolean;
	user: User | null;
	fetchUser: () => void;
	logout: () => void;
}
