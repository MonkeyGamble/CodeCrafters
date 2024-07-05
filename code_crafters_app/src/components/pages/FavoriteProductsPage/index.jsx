import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../../UI/ProductCard/index';
import s from './FavoriteProductsPage.module.css';
import { Link } from 'react-router-dom';
import Filter from '../../UI/Filter';
import { useFilters } from '../../UI/Filter/useFilters';
import {
	setFiltersAction,
	filterProductsAction,
} from '../../../redux/reducers/productsReducer';
import { filterProducts } from '../../UI/Filter/filterUtils';

export default function FavoriteProductsPage() {
	const dispatch = useDispatch();
	const favoriteProducts = useSelector(
		state => state.products.favoriteProducts
	);
	const filters = useSelector(state => state.products.filters);
	const [localFilters, handleFilterChange] = useFilters({
		minPrice: '',
		maxPrice: '',
		isDiscounted: false,
		sortOrder: 'default',
	});
	const [filteredFavoriteProducts, setFilteredFavoriteProducts] = useState([]);

	useEffect(() => {
		dispatch(setFiltersAction(localFilters));
	}, [localFilters, dispatch]);

	useEffect(() => {
		setFilteredFavoriteProducts(filterProducts(favoriteProducts, filters));
	}, [favoriteProducts, filters]);

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
						showDiscountedItemsFilter={true}
					/>
					<div className={s.productsList}>
						{filteredFavoriteProducts.map(product => (
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
