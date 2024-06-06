import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './DiscountProducts.module.css';

import '../../../../Global.css';

import { getDiscountProducts } from '../../../../asyncActions/products';
import like from '../../../../assets/img/like_white.png';
import shopping_cart from '../../../../assets/img/shopping_cart_white.png';
import { Link } from 'react-router-dom';
import { ROOT_URL } from '../../../..';
import { shuffle } from '../../../../utils/shuffleArray';

export default function DiscountProducts() {
	const dispatch = useDispatch();

	const discountProducts = useSelector(
		state => state.products.discountProducts
	);

	useEffect(() => {
		dispatch(getDiscountProducts());
	}, [dispatch]);

	const randomDiscountProducts = shuffle(discountProducts).slice(0, 4);

	return (
		<div className={`${s.sale_container} content_line`}>
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
						<div
							className={s.product_picture}
							style={{ backgroundImage: `url(${ROOT_URL + product.image})` }}
						>
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

			<button className={s.button_340}>All sales</button>
		</div>
	);
}
