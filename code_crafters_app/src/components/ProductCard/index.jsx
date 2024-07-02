import s from './ProductCard.module.css';
import '../../Global.css';
import like from '../../assets/img/like_white.png';
import { Link } from 'react-router-dom';
import { ROOT_URL } from '../..';
import Basket from '../Basket';
import { useBasketActions } from '../../asyncActions/basket';
// import { addProductFavorite } from '../../asyncActions/products';
import { useDispatch, useSelector } from 'react-redux';
import {
	addProductFavoriteAction,
	removeProductFavoriteAction,
} from '../../store/productsReducer';

export default function ProductCard({ product, ...otherProps }) {
	const dispatch = useDispatch();
	const { addProductToBasket } = useBasketActions();
	const isFavorite = useSelector(state =>
		state.products.favoriteProducts.some(
			favProduct => favProduct.id === product.id
		)
	);

	if (!product || !product.id) {
		return null;
	}

	const handleCardClick = e => {
		e.stopPropagation();
		// Если кликнули на карточку продукта внутри Link, предотвращаем всплытие события
	};

	const handleBasketClick = e => {
		e.preventDefault();
		e.stopPropagation();
		addProductToBasket({ ...product, count: 1 });
	};

	const handleFavoriteClick = e => {
		e.preventDefault();
		e.stopPropagation();
		const updatedProduct = { ...product, isFavorite: !product.isFavorite };
		if (product.isFavorite) {
			dispatch(removeProductFavoriteAction(product.id));
		} else {
			dispatch(addProductFavoriteAction(updatedProduct));
		}
		console.log('productId: ', product.id);
		console.log('product.isFavorite: ', product.isFavorite ? 'true' : 'false');
		console.log('product.isFavoriteFromRedux: ', isFavorite ? 'true' : 'false');
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
					<img src={like} alt='like' onClick={handleFavoriteClick} />
					<Basket product={product} onClick={handleBasketClick} />
				</div>
			</div>

			<div className={s.product_description}>
				<h3>{product.title}</h3>

				<div className={s.price}>
					{product.discont_price ? (
						<>
							<h2
								style={{
									fontSize: '40px',
									fontWeight: '600',
									color: 'var(--text_black)',
								}}
							>
								${product.discont_price.toFixed(2)}
							</h2>
							<h5
								style={{
									fontSize: '20px',
									fontWeight: '500',
									color: 'var(--grey)',
									textDecoration: 'line-through',
								}}
							>
								${product.price.toFixed(2)}
							</h5>
						</>
					) : (
						<h5
							style={{
								fontSize: '40px',
								fontWeight: '600',
								color: 'var(--text_black)',
								textDecoration: 'none',
							}}
						>
							${product.price.toFixed(2)}
						</h5>
					)}
				</div>
			</div>
		</Link>
	);
}
