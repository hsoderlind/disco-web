import { Suspense, lazy } from 'react';
import { ComponentProviderProps } from './types';

export const ComponentProvider = ({ componentPath, componentProps }: ComponentProviderProps) => {
	const Component = lazy(() => import(`../../${componentPath}`));

	return (
		<div>
			<Suspense fallback='Laddar...'>
				<Component {...componentProps} />
			</Suspense>
		</div>
	);
};
