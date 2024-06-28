import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../../../asyncActions/products';
import s from './FavoriteProductsPage.module.css';
import { Link } from 'react-router-dom';
import ProductCard from '../../ProductCard';

export default function FavoriteProductsPage() {
	const dispatch = useDispatch();

	const allProducts = useSelector(state => state.products.allProducts);

	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);
	
	//Извлекаем информацию о фаворитных товарах из LocalStorage
	const favoriteProductsFromStorage =
		JSON.parse(localStorage.getItem('favoriteProducts')) || [];

	// Фильтруем все товары и оставляем только те, которые являются фаворитными
	const favoriteProducts = allProducts.filter(product =>
		favoriteProductsFromStorage.some(
			favorite => favorite.id === product.id && favorite.isFavorite
		)
	);

	// const favoriteProducts = allProducts.filter(
	// 	product => product.isFavorite === true
	// );

	console.log('Favorite products:', favoriteProducts);
	return (
		<div className={`${s.discount_wrapper} content_line`}>
			<div className={s.nav_buttons}>
				<Link to='/'>
					<button className={s.first_button}>Main page</button>
				</Link>
				<div className={s.nav_line}></div>
				<Link to='/favorite_products '>
					<button className={s.second_button}>Favorite products </button>
				</Link>
			</div>

			<div className={s.productsList}>
				{favoriteProducts.length > 0 ? (
					favoriteProducts.map(product => (
						<ProductCard key={product.id} product={product} />
					))
				) : (
					<p>No favorite products found.</p>
				)}
			</div>
		</div>
	);
}
