import React, { useState, useEffect } from 'react';
import s from './ProductItem.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../../asyncActions/products';
import { getAllCategories } from '../../../asyncActions/categories';
import { Link } from 'react-router-dom';
import { ROOT_URL } from '../../..';
import '../../../Global.css';
import like from '../../../assets/img/like_white.png';
import Counter from '../../Counter/counter';
import { useBasketActions } from '../../../asyncActions/basket';

export default function ProductItemPage() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const product = useSelector(state => state.products.product);
	const categories = useSelector(state => state.categories.allCategories);
	const { addProductToBasket } = useBasketActions();

	useEffect(() => {
		dispatch(getProductById(id));
		dispatch(getAllCategories());
	}, [dispatch, id]);

	return (
		<div className={`${s.product_wrapper} content_line`}>
			<div className={s.nav_buttons}>
				<Link to='/'>
					<button className={s.main_button}>Main page</button>
				</Link>
				<div className={s.nav_line}></div>
				<Link to='/all_categories'>
					<button className={s.section_button}>Categories</button>
				</Link>
				<div className={s.nav_line}></div>
				<Link
					to={`/categories/${
						categories.find(category => category.id === product.categoryId)?.id
					}`}
				>
					<button className={s.category_name_button}>
						{
							categories.find(category => category.id === product.categoryId)
								?.title
						}
					</button>
				</Link>
				<div className={s.nav_line}></div>
				<button className={s.product_name_button}>{product.title}</button>
			</div>

			<div className={s.product_card}>
				<img src={`${ROOT_URL}${product.image}`} alt={product.title} />
				<div className={s.product_description}>
					<div className={s.product_header}>
						<h1>{product.title}</h1>
						<img src={like} alt='like' />
					</div>
					<div className={s.price_section}>
						{product.discont_price ? (
							<>
								<div className={s.product_price}>
									<h2>${product.discont_price}</h2>
									<h5>${product.price}</h5>
								</div>
								<div className={s.discount_size}>
									-
									{Math.round(
										(1 - product.discont_price / product.price) * 100
									)}
									%
								</div>
							</>
						) : (
							<h2>${product.price}</h2>
						)}
					</div>
					<div className={s.add_to_cart}>
						<Counter />
						<button
							className={s.add_button}
							onClick={() => {
								addProductToBasket(product);
								console.log('Added product: ', product);
							}}
						>
							Add to cart
						</button>
					</div>

					<p>{product.description}</p>
				</div>
			</div>
		</div>
	);
}
