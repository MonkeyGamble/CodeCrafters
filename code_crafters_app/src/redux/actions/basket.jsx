import { useDispatch } from 'react-redux';
import {
	addProductToBasketAction,
	removeProductFromBasketAction,
	incrementProductCountAction,
	decrementProductCountAction,
} from '../reducers/basketReducer';

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
