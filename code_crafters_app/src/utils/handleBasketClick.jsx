import { useSelector } from 'react-redux';
import { useBasketActions } from '../redux/actions/basket';

const useHandleBasketClick = product => {
	const inBasket = useSelector(state =>
		state.basket.basket.items.some(
			baskProduct => baskProduct.id === product?.id
		)
	);
	const { addProductToBasket, removeProductFromBasket } = useBasketActions();

	const handleBasketClick = e => {
		e.preventDefault();
		e.stopPropagation();
		if (inBasket) {
			removeProductFromBasket(product.id);
		} else {
			addProductToBasket({ ...product, count: 1 });
		}
	};
	return handleBasketClick;
};

export default useHandleBasketClick;
