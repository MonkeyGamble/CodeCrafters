import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './Global.css';
import colors from './colors';
import { Provider } from 'react-redux';
import store from './store/index';

export const ROOT_URL = 'http://localhost:3333/';

const setCSSVariables = colors => {
	const root = document.documentElement;
	Object.keys(colors).forEach(key => {
		root.style.setProperty(`--${key}`, colors[key]);
	});
};

setCSSVariables(colors);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
