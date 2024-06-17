import { useDispatch } from 'react-redux';
import {
	addProductToBasketAction,
	removeProductFromBasketAction,
	incrementProductCountAction,
	decrementProductCountAction,
} from '../store/basketReducer';

export function useBasketActions() {
	const dispatch = useDispatch();

	const addProductToBasket = product => {
		dispatch(addProductToBasketAction(product));
	};

	const removeProductFromBasket = id => {
		dispatch(removeProductFromBasketAction(id));
	};

	const incrementProductCount = id => {
		dispatch(incrementProductCountAction(id));
	};

	const decrementProductCount = id => {
		dispatch(decrementProductCountAction(id));
	};

	return {
		addProductToBasket,
		removeProductFromBasket,
		incrementProductCount,
		decrementProductCount,
	};
}

// export function addProductToBasket(product) {
// 	return function (dispatch) {
// 		dispatch(addProductToBasketAction(product));
// 	};
// }

// export function removeProductFromBasket(id) {
// 	return function (dispatch) {
// 		dispatch(removeProductFromBasketAction(id));
// 	};
// }

// export function incrementProductCount(id) {
// 	return function (dispatch) {
// 		dispatch(incrementProductCountAction(id));
// 	};
// }

// export function decrementProductCount(id) {
// 	return function (dispatch) {
// 		dispatch(decrementProductCountAction(id));
// 	};
// }
