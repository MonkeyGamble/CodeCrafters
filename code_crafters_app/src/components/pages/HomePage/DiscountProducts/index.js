import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './DiscountProducts.module.css';
import { getAllProducts } from '../../../../asyncActions/products';
import like from '../../../../assets/img/like_white.png';
import shopping_cart from '../../../../assets/img/shopping_cart_white.png';
import { Link } from 'react-router-dom';

export default function DiscountProducts() {
	const dispatch = useDispatch();
	const allProducts = useSelector(state => state.products.allProducts);

	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

	const discountProducts = allProducts.filter(
		product => product.discont_price !== null
	);

	function shuffle(array) {
		let currentIndex = array.length,
			tempElem,
			randomIndex;

		// Пока остаются элементы для перемешивания
		while (0 !== currentIndex) {
			// Выбираем случайный элемент
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// Меняем текущий элемент с выбранным случайным элементом
			tempElem = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = tempElem;
		}

		return array;
	}

	const randomDiscountProducts = shuffle(discountProducts).slice(0, 4);

	console.log(discountProducts);
	return (
		<div className={s.sale_container}>
			<div className={s.component_header}>
				<h1>Sale</h1>
				<div class={s.line}></div>
				<Link to='/all_sales'>
					<button>All sales</button>
				</Link>
			</div>

			<div className={s.cards_container}>
				{randomDiscountProducts.map(product => (
					<div key={product.id} className={s.card}>
						<div className={s.product_picture}>
							<div className={s.discount_size}>
								-{Math.round((1 - product.discont_price / product.price) * 100)}
								%
							</div>
							<div className={s.like_cart}>
								<img src={like} alt='like' />
								<img src={shopping_cart} alt='cart' />
							</div>
						</div>

						<div className={s.product_description}>
							<h3>{product.title}</h3>
							<div className={s.price}>
								<h2>${product.discont_price}</h2>
								<h5>${product.price}</h5>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
