import { FC, useState } from 'react';
import { ReactCommonProps } from '../../types/common';
import { useFetchCsrfToken } from '../../services/auth/hooks/useFetchCsrfToken';
import { useFetchUser } from '../../services/user/hooks/useFetchUser';
import { useQuery } from '@tanstack/react-query';
import { User } from '../../services/user/User';
import { AuthContext as AuthContextType } from './types';
import { AuthContext } from './AuthContext';
import { PageLoader } from '../../components/page-loader/PageLoader';

const AuthProvider: FC<ReactCommonProps> = ({ children }) => {
	const [fetchCsrfTokenQueryKey, fetchCsrfTokenQueryFn] = useFetchCsrfToken();
	const [fetchUserQueryKey, fetchUserQueryFn] = useFetchUser();
	const [fetchUser, setFetchUser] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const [isFetchingCsrfToken, setIsFetchingCsrfToken] = useState(true);
	const [isAuthenticating, setIsAuthenticating] = useState(true);
	const inAuth =
		window.location.pathname === '/login' ||
		window.location.pathname === '/register' ||
		window.location.pathname === '/reset-password';
	const [allProcessesDone, setAllProcessesDone] = useState(false);

	useQuery(fetchCsrfTokenQueryKey, fetchCsrfTokenQueryFn, {
		onSuccess: () => {
			setIsFetchingCsrfToken(false);

			if (!inAuth) {
				setFetchUser(true);
			} else {
				setAllProcessesDone(true);
			}
		},
		onError: () => {
			setIsFetchingCsrfToken(false);

			if (!inAuth) {
				window.location.href = '/login';
			}
		}
	});

	useQuery(fetchUserQueryKey, fetchUserQueryFn, {
		enabled: fetchUser,
		retry: false,
		onSuccess: (data) => {
			setUser(data);
			setIsAuthenticating(false);
			setFetchUser(false);
			setAllProcessesDone(true);

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
		isFetchingCsrfToken,
		isAuthenticating,
		user,
		fetchUser: () => {
			setFetchUser(true);
		},
		logout: () => {
			setUser(null);
		}
	};

	return <AuthContext.Provider value={value}>{!allProcessesDone ? <PageLoader /> : children}</AuthContext.Provider>;
};

export default AuthProvider;
