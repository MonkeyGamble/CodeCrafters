import {
	getAllProductsAction,
	// getDiscountProductsAction,
} from '../store/productsReducer';
import { ROOT_URL } from '..';

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

// export function getDiscountProducts() {
// 	return function (dispatch) {
// 		fetch(ROOT_URL + 'products/all')
// 			.then(res => res.json())
// 			.then(products => {
// 				const discountProducts = products.filter(
// 					product => product.discont_price !== null
// 				);
// 				dispatch(getDiscountProductsAction(discountProducts));
// 			})
// 			.catch(error =>
// 				console.error('Error fetching discount products:', error)
// 			);
// 	};
// }
