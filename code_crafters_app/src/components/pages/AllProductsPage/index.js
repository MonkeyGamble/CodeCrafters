import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import s from './AllProductsPage.module.css';
import Filter from '../../Filter/index.jsx';
import { getAllProducts } from '../../../asyncActions/products.js';
import ProductCard from '../../ProductCard/index.jsx';
import { useFilters } from '../../Filter/useFilters.js';
import {
	setFiltersAction,
	filterProductsAction,
} from '../../../store/productsReducer.js';
import ProductSkeleton from '../../ProductSkeleton/ProductSkeleton.js';

export default function AllProductsPage() {
	const dispatch = useDispatch();
	const filteredProducts = useSelector(
		state => state.products.filteredProducts
	);
	const filters = useSelector(state => state.products.filters);
	const [localFilters, handleFilterChange] = useFilters({
		minPrice: '',
		maxPrice: '',
		isDiscounted: false,
		sortOrder: 'default',
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		dispatch(setFiltersAction(localFilters));
	}, [localFilters, dispatch]);

	useEffect(() => {
		dispatch(filterProductsAction());
	}, [filters, dispatch]);

	useEffect(() => {
		// Simulate loading delay for demonstration
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1000); // Adjust the time as needed

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className={`${s.all_products_container} content_line`}>
			<div className={s.nav_buttons}>
				<Link to='/'>
					<button className={s.first_button}>Main page</button>
				</Link>
				<div className={s.nav_line}></div>
				<Link to='/all_products'>
					<button className={s.second_button}>All products</button>
				</Link>
			</div>

			<h1>All Products</h1>

			<Filter
				filters={localFilters}
				onFilterChange={handleFilterChange}
				showDiscountedItemsFilter={true}
			/>

			<div className={s.cards_container}>
				{loading
					? Array.from({ length: 10 }).map((_, index) => (
							<ProductSkeleton key={index} />
					  ))
					: filteredProducts.map(product => (
							<ProductCard key={product.id} product={product} />
					  ))}
			</div>
		</div>
	);
}
