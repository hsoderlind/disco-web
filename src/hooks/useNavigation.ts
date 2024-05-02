import { useCallback } from "react";
import { useNavigate as useReactNavigate } from "react-router-dom"
export const useNavigation = () => {
	const _navigate = useReactNavigate();
	const navigate = useCallback((to: string, title: string) => _navigate(to, {state: {title}}), [_navigate]);

	return navigate;
}
