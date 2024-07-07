import { useDispatch, useSelector } from 'react-redux';
import {
	addProductFavoriteAction,
	removeProductFavoriteAction,
} from '../redux/reducers/productsReducer';

const useHandleFavoriteClick = product => {
	const dispatch = useDispatch();
	const isFavorite = useSelector(state => {
		if (!product || !product.id) {
			return false;
		}
		return state.products.favoriteProducts.some(
			favProduct => favProduct.id === product.id
		);
	});

	const handleFavoriteClick = e => {
		e.preventDefault();
		e.stopPropagation();
		if (!product || !product.id) {
			console.error('Product is null or undefined or does not have an id');
			return;
		}
		if (isFavorite) {
			dispatch(removeProductFavoriteAction(product.id));
		} else {
			dispatch(addProductFavoriteAction(product));
		}
	};

	return handleFavoriteClick;
};

export default useHandleFavoriteClick;
