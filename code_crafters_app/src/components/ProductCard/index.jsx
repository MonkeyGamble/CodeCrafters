import s from './ProductCard.module.css';
import '../../Global.css';
import like from '../../assets/img/like_white.png';
import { Link } from 'react-router-dom';
import { ROOT_URL } from '../..';
import Basket from '../Basket';
import { useBasketActions } from '../../asyncActions/basket';
import { addProductFavorite } from '../../asyncActions/products';
import { useDispatch, useSelector } from 'react-redux';
import {
	addProductFavoriteAction,
	removeProductFavoriteAction,
} from '../../store/productsReducer';
import { useEffect } from 'react';


export default function ProductCard({ product, ...otherProps }) {
	const dispatch = useDispatch();
	const { addProductToBasket } = useBasketActions();
	const allProducts = useSelector(state => state.products.allProducts);

	// Получаем обновленный продукт из состояния
	const updatedProduct = allProducts.find(pr => pr.id === product.id);



	// if (!product || !product.id) {
	// 	return null;
	// }

	const handleCardClick = e => {
		e.stopPropagation();
		// Если кликнули на карточку продукта внутри Link, предотвращаем всплытие события
	};

	const handleBasketClick = e => {
		e.preventDefault();
		e.stopPropagation();

		console.log('Product to add:', product);
		console.log('Price:', product.price);
		console.log('Discont price:', product.discont_price);
		console.log('Count:', product.count);

		const priceToAdd = (product.discont_price || product.price) * product.count;
		console.log('Price to add:', priceToAdd);

		addProductToBasket({ ...product, count: 1 });
		// console.log(
		// 	`Added to basket: ${product.title}, price: ${
		// 		product.discont_price || product.price
		// 	}`
		// );
	};

	const handleFavoriteClick = e => {
		e.preventDefault();
		e.stopPropagation();

		if (product.isFavorite) {
			console.log('Removing from favorites:', updatedProduct);
			dispatch(removeProductFavoriteAction(product.id));
		} else {
			console.log('Adding to favorites:', updatedProduct);
			dispatch(addProductFavoriteAction(product));
		}
		
		
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

			{/* отображаем обновленный продукт (проверяем isFavorite) */}
			<div>
				{updatedProduct && (
					<p>Is Favorite: {updatedProduct.isFavorite ? 'Yes' : 'No'}</p>
				)}
			</div>
		</Link>
	);
}
