import s from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ROOT_URL } from '../../../index';
import Basket from '../Basket/index';
import Like from '../Like/index.jsx';
import { useBasketActions } from '../../../redux/actions/basket';
import {
	addProductFavoriteAction,
	removeProductFavoriteAction,
} from '../../../redux/reducers/productsReducer';

export default function ProductCard({ product, ...otherProps }) {
	const dispatch = useDispatch();
	const { addProductToBasket, removeProductFromBasket } = useBasketActions();

	// Функция для обработки кликов на кнопку "Добавить в корзину"
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

	// Функция для обработки кликов на кнопку "Добавить в избранное"
	const useHandleFavoriteClick = product => {
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

	const handleFavoriteClick = useHandleFavoriteClick(product);
	const handleBasketClick = useHandleBasketClick(product);

	if (!product || !product.id) {
		return null;
	}

	const handleCardClick = e => {
		e.stopPropagation();
		// Если кликнули на карточку продукта внутри Link, предотвращаем всплытие события
	};

	return (
		<Link
			to={`/products/${product.id}`}
			className={s.card}
			onClick={handleCardClick}
			{...otherProps}
		>
			<div
				className={s.product_picture}
				style={{ backgroundImage: `url(${ROOT_URL + product.image})` }}
			>
				{product.discont_price && (
					<div className={s.discount_size}>
						-{Math.round((1 - product.discont_price / product.price) * 100)}%
					</div>
				)}

				<div className={s.like_cart}>
					<Like product={product} onClick={handleFavoriteClick} />
					<Basket product={product} onClick={handleBasketClick} />
				</div>
			</div>

			<div className={s.product_description}>
				<h3>{product.title}</h3>

				<div className={s.price}>
					{product.discont_price ? (
						<>
							<h2>${product.discont_price.toFixed(2)}</h2>
							<h5>${product.price.toFixed(2)}</h5>
						</>
					) : (
						<h4>${product.price.toFixed(2)}</h4>
					)}
				</div>
			</div>
		</Link>
	);
}
