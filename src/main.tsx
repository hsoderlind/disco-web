import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './lib/application-builder/ApplicationBuilder';

document.addEventListener('contextmenu', (e) => {
	import.meta.env.PROD && e.preventDefault();
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
