import { useCallback } from "react";
import { NavigateOptions, useNavigate as useReactNavigate } from "react-router-dom"
export const useNavigate = () => {
	const _navigate = useReactNavigate();
	const navigate = useCallback((to: string, title: string, options?: Omit<NavigateOptions, 'state'>) => _navigate(to, {...options, state: {title}}), [_navigate]);

	return navigate;
}
