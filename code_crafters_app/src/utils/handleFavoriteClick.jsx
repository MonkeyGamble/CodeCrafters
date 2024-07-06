import { useDispatch, useSelector } from 'react-redux';
import {
	addProductFavoriteAction,
	removeProductFavoriteAction,
} from '../redux/reducers/productsReducer';

const useHandleFavoriteClick = product => {
	const dispatch = useDispatch();
	const isFavorite = useSelector(state =>
		state.products.favoriteProducts.some(
			favProduct => favProduct.id === product.id
		)
	);

	const handleFavoriteClick = e => {
		e.preventDefault();
		e.stopPropagation();
		// const updatedProduct = { ...product, isFavorite: !isFavorite };
		if (isFavorite) {
			dispatch(removeProductFavoriteAction(product.id));
		} else {
			dispatch(addProductFavoriteAction(product));
		}
	};

	return handleFavoriteClick;
};

export default useHandleFavoriteClick;
