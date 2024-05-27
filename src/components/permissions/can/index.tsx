import { useUserCan } from '../hooks/useUserCan';
import { CanProps } from './types';

export const Can = ({ children, permission, renderDecline, throwException = false }: CanProps) => {
	const granted = useUserCan(permission, throwException);

	if (!granted) {
		return typeof renderDecline === 'undefined' ? null : renderDecline;
	}

	return children;
};
