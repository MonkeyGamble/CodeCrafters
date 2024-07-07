import { useSelector } from 'react-redux';
import { useBasketActions } from '../redux/actions/basket';

const useHandleBasketClick = product => {
	// Проверка на наличие объекта product и его свойства id
	const inBasket = useSelector(state => {
		if (!product || !product.id) {
			return false;
		}
		return state.basket.basket.items.some(
			baskProduct => baskProduct.id === product.id
		);
	});

	const { addProductToBasket, removeProductFromBasket } = useBasketActions();

	const handleBasketClick = e => {
		e.preventDefault();
		e.stopPropagation();
		if (!product || !product.id) {
			console.error('Product is null or undefined or does not have an id');
			return;
		}
		if (inBasket) {
			removeProductFromBasket(product.id);
		} else {
			addProductToBasket({ ...product, count: 1 });
		}
	};

	return handleBasketClick;
};

export default useHandleBasketClick;
