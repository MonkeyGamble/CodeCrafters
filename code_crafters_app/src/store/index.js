import { createStore, combineReducers, applyMiddleware } from 'redux';
import themeReducer from './themeButtonReducer';
import { productsReducer } from './productsReducer';
import { thunk } from 'redux-thunk';
import { categoriesReducer } from './categoriesReducer';
import { basketReducer } from './basketReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import { modalWindowReducer } from './modalWindowReducer';

const rootReducer = combineReducers({
	theme: themeReducer,
	products: productsReducer,
	modalWindow: modalWindowReducer,
	categories: categoriesReducer,
	basket: basketReducer,
});

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;

// Список продуктов (для категории, для всех продуктов, для продуктов со скидкой, фаворитные продукты). Получение списков продуктов, фильтрация
// Корзина. (добавление элемента в корзину, изменение count каждого элемента, удаление продукта, очистка списка продукта после нажатия на “купить”)
// Описание продукта (получение продукта, изменение сво-ва count (инкремент, декремент))
// Список категорий (получение списка категорий)
//Модальное окно (открыть, закрыть окно)
// Тема приложение (переключение темы с темной на светлую, с светлой на темную)
