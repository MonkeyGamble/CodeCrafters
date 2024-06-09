import {
	getAllProductsAction,
	getProductByIdAction,
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
