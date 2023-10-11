import { FC, useState } from 'react';
import { ReactCommonProps } from '../../types/common';
import { useFetchCsrfToken } from '../../services/auth/hooks/useFetchCsrfToken';
import { useFetchUser } from '../../services/user/hooks/useFetchUser';
import { useQuery } from '@tanstack/react-query';
import { User } from '../../services/user/User';
import { AuthContext as AuthContextType } from './types';
import { AuthContext } from './AuthContext';

const AuthProvider: FC<ReactCommonProps> = ({ children }) => {
	const [fetchCsrfTokenQueryKey, fetchCsrfTokenQueryFn] = useFetchCsrfToken();
	const [fetchUserQueryKey, fetchUserQueryFn] = useFetchUser();
	const [fetchUser, setFetchUser] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const [isAuthenticating, setIsAuthenticating] = useState(true);
	const inAuth =
		window.location.pathname === '/login' ||
		window.location.pathname === '/register' ||
		window.location.pathname === '/reset-password';

	useQuery(fetchCsrfTokenQueryKey, fetchCsrfTokenQueryFn, {
		onSuccess: () => {
			if (!inAuth) {
				setFetchUser(true);
			}
		}
	});

	useQuery(fetchUserQueryKey, fetchUserQueryFn, {
		enabled: fetchUser,
		onSuccess: (data) => {
			setUser(data);
			setIsAuthenticating(false);
			setFetchUser(false);

			if (inAuth) {
				window.location.href = '/';
			}
		},
		onError: () => {
			setIsAuthenticating(false);
			setFetchUser(false);
			window.location.href = '/login';
		}
	});

	const value: AuthContextType = {
		isAuthenticating,
		user,
		fetchUser: () => {
			setFetchUser(true);
		},
		logout: () => {
			setUser(null);
		}
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
