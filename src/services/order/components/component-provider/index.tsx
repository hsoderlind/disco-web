import { Suspense, lazy } from 'react';
import { ComponentProviderProps } from './types';

export const ComponentProvider = ({ componentPath }: ComponentProviderProps) => {
	const Component = lazy(() => import(`../../${componentPath}`));
	console.log('Component', Component);

	return (
		<div>
			<Suspense fallback='Laddar...'>
				<Component />
			</Suspense>
		</div>
	);
};
