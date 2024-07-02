import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './Global.css';
import lightColors from './lightColors';
import darkColors from './darkColors';
import { Provider } from 'react-redux';
import store from './store/index';

// export const ROOT_URL = 'http://localhost:3333/';

export const ROOT_URL = 'https://telran-backend.onrender.com/';

// const setCSSVariables = colors => {
// 	const root = document.documentElement;
// 	Object.keys(colors).forEach(key => {
// 		root.style.setProperty(`--${key}`, colors[key]);
// 	});
// };

// setCSSVariables(colors);

const setCSSVariables = colors => {
	const root = document.documentElement;
	Object.keys(colors).forEach(key => {
		root.style.setProperty(`--${key}`, colors[key]);
	});
};

const isLightTheme = store.getState().theme.isLight;
setCSSVariables(isLightTheme ? lightColors : darkColors);

store.subscribe(() => {
	const isLightTheme = store.getState().theme.isLight;
	setCSSVariables(isLightTheme ? lightColors : darkColors);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
