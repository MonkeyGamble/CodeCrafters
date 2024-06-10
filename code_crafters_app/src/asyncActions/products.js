import {
	getAllProductsAction,
	getProductByIdAction,
	getProductsByCategoryIdAction,
} from '../store/productsReducer';
import { ROOT_URL } from '../';

export function getAllProducts() {
	return function (dispatch) {
		fetch(ROOT_URL + 'products/all')
			.then(res => res.json())
			.then(products => {
				dispatch(getAllProductsAction(products));
			})
			.catch(error => console.error('Error fetching products:', error));
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

// export function getProductsByCategoryId(id) {
// 	return function (dispatch) {
// 		fetch(ROOT_URL + `categories/${id}`)
// 			.then(res => res.json())
// 			.then(products => {
// 				// if (Array.isArray(products.data)) {
// 				// 	// Проверяем, что products является массивом
// 				dispatch(getProductsByCategoryIdAction(products));
// 				// } else {
// 				// 	throw new Error('Products is not an array');
// 			})
// 			.catch(error => console.error('Error fetching products:', error));
// 	};
// }

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
