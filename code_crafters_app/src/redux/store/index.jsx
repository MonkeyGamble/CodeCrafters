import { createStore, combineReducers, applyMiddleware } from 'redux';
import themeReducer from '../reducers/themeButtonReducer';
import { productsReducer } from '../reducers/productsReducer';
import { thunk } from 'redux-thunk';
import { categoriesReducer } from '../reducers/categoriesReducer';
import { basketReducer } from '../reducers/basketReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import { modalWindowReducer } from '../reducers/modalWindowReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Корневой редьюсер
const rootReducer = combineReducers({
	theme: themeReducer,
	products: productsReducer,
	modalWindow: modalWindowReducer,
	categories: categoriesReducer,
	basket: basketReducer,
});

// Конфигурация для persist
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['basket'],
};

// Создание persisted редьюсера
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Создание хранилища
const store = createStore(
	persistedReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

// Создание persistor
const persistor = persistStore(store);

export { store, persistor };
