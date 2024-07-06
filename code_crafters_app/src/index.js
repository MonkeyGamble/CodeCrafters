import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/Global.css';
import lightColors from './styles/lightColors';
import darkColors from './styles/darkColors';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store/index';
import { PersistGate } from 'redux-persist/integration/react';

// export const ROOT_URL = 'http://localhost:3333/';

export const ROOT_URL = 'https://telran-backend.onrender.com/';

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
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
);
