import { User } from '../../services/user/User';

export interface AuthContext {
	isAuthenticating: boolean;
	user: User | null;
	fetchUser: () => void;
	logout: () => void;
}
