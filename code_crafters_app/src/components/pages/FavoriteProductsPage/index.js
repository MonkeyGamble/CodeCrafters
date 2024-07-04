import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../../ProductCard';
import s from './FavoriteProductsPage.module.css';
import { Link } from 'react-router-dom';
import Filter from '../../Filter';
import { useFilters } from '../../Filter/useFilters';
import { getAllProducts } from '../../../asyncActions/products';
import {
	filterProductsAction,
	setFiltersAction,
} from '../../../store/productsReducer';

export default function FavoriteProductsPage() {
	const favoriteProducts = useSelector(
		state => state.products.favoriteProducts
	);
	const dispatch = useDispatch();
	const filters = useSelector(state => state.products.filters);
	const [localFilters, handleFilterChange] = useFilters({
		minPrice: '',
		maxPrice: '',
		isDiscounted: true,
		sortOrder: 'default',
	});

	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

	useEffect(() => {
		dispatch(setFiltersAction(localFilters));
	}, [localFilters, dispatch]);

	useEffect(() => {
		dispatch(filterProductsAction());
	}, [filters, dispatch]);

	return (
		<div className={`${s.favorite_wrapper} content_line`}>
			<div className={s.nav_buttons}>
				<Link to='/'>
					<button className={s.first_button}>Main page</button>
				</Link>
				<div className={s.nav_line}></div>
				<Link to='/favorite_products'>
					<button className={s.second_button}>Favorite products</button>
				</Link>
			</div>

			<h1>Liked products</h1>

			{favoriteProducts.length === 0 ? (
				<div className={s.empty_cart}>
					<p>
						Looks like you have no items in your favorite products currently.
					</p>
					<Link to='/all_products'>
						<button>Continue Shopping</button>
					</Link>
				</div>
			) : (
				<>
					<Filter
						filters={localFilters}
						onFilterChange={handleFilterChange}
						showDiscountedItemsFilter={false}
					/>
					<div className={s.productsList}>
						{favoriteProducts.map(product => (
							<ProductCard
								key={product.id}
								product={product}
								header='Favorite products'
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
}
