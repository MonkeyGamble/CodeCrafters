import {
	getAllProductsAction,
	getProductByIdAction,
	getProductsByCategoryIdAction,
	incrementProductCountAction,
	decrementProductCountAction,
	addProductFavoriteAction,
	removeProductFavoriteAction,
} from '../reducers/productsReducer';

import { ROOT_URL } from '../../index';

export function getAllProducts() {
	return async function (dispatch) {
		try {
			const response = await fetch(`${ROOT_URL}products/all`);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const products = await response.json();
			dispatch(getAllProductsAction(products));
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	};
}


export function getProductById(id) {
	return async function (dispatch) {
		try {
			const response = await fetch(ROOT_URL + `products/${id}`);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const product = await response.json();
			dispatch(getProductByIdAction(product));
		} catch (error) {
			console.error('Error fetching product:', error);
		}
	};
}

export function addProductFavorite(product) {
	return function (dispatch) {
		dispatch(addProductFavoriteAction(product));
	};
}

export function removeProductFavorite(id) {
	return function (dispatch) {
		dispatch(removeProductFavoriteAction(id));
	};
}


export function getProductsByCategoryId(id) {
	return async function (dispatch) {
		try {
			const response = await fetch(ROOT_URL + `categories/${id}`);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const products = await response.json();
			dispatch(getProductsByCategoryIdAction(products));
		} catch (error) {
			console.error('Error fetching product:', error);
		}
	};
}

export const incrementProductCount = id => (dispatch, getState) => {
	const state = getState();
	const basket = state.basket?.items || [];
	const product = basket.find(item => item.id === id);
	if (product) {
		dispatch(incrementProductCountAction(id));
	}
};

export const decrementProductCount = id => (dispatch, getState) => {
	const state = getState();
	const basket = state.basket?.items || [];
	const product = basket.find(item => item.id === id);
	if (product) {
		dispatch(decrementProductCountAction(id));
	}
};
