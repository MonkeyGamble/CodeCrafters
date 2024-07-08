import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../../../styles/Global.css';
import { getAllProducts } from '../../../../redux/actions/products';
import { shuffle } from '../../../../utils/shuffleArray';
import s from './DiscountProducts.module.css';
import { ROOT_URL } from '../../../..';
import {
	addProductFavoriteAction,
	removeProductFavoriteAction,
} from '../../../../redux/reducers/productsReducer';
import { Link } from 'react-router-dom';
import Like from '../../../UI/Like';
import Basket from '../../../UI/Basket';
import { useBasketActions } from '../../../../redux/actions/basket';

export default function DiscountProductsHomePage() {
	const dispatch = useDispatch();
	const { addProductToBasket, removeProductFromBasket } = useBasketActions();
	const discountProducts = useSelector(
		state => state.products.discountProducts
	);
	const randomDiscountProducts = shuffle(discountProducts).slice(0, 4);

	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

	const handleFavoriteClick = (e, product) => {
		e.preventDefault();
		e.stopPropagation();
		const isFavorite = product.isFavorite;
		const updatedProduct = { ...product, isFavorite: !isFavorite };
		if (isFavorite) {
			dispatch(removeProductFavoriteAction(product.id));
		} else {
			dispatch(addProductFavoriteAction(updatedProduct));
		}
	};

	const handleBasketClick = (e, product, inBasket) => {
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

	const handleCardClick = e => {
		e.stopPropagation();
		// Если кликнули на карточку продукта внутри Link, предотвращаем всплытие события, чтобы оно не распространялось на клики на Фаворитные и Корзину
	};

	return (
		<section className={`${s.discount_products_wrapper} content_line`}>
			<div className={s.component_header}>
				<h1>Sale</h1>
				<div className={s.line}></div>
				<Link to='/all_sales'>
					<button className={s.my_button}>All sales</button>
				</Link>
			</div>

			<div className={s.card_container}>
				{randomDiscountProducts.map(product => (
					<Link
						key={product.id}
						to={`/products/${product.id}`}
						className={s.card}
						onClick={handleCardClick}
					>
						<div
							className={s.product_picture}
							style={{ backgroundImage: `url(${ROOT_URL + product.image})` }}
						>
							{product.discont_price && (
								<div className={s.discount_size}>
									-
									{Math.round(
										(1 - product.discont_price / product.price) * 100
									)}
									%
								</div>
							)}

							<div className={s.like_cart}>
								<Like
									product={product}
									onClick={e => handleFavoriteClick(e, product)}
								/>
								<Basket
									product={product}
									onClick={e => handleBasketClick(e, product, product.inBasket)}
								/>
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
				))}
			</div>
		</section>
	);
}
