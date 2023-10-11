import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './lib/application-builder/ApplicationBuilder';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
