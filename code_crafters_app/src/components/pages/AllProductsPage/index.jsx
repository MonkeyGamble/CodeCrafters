import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import s from './AllProductsPage.module.css';
import Filter from '../../UI/Filter';
import { getAllProducts } from '../../../redux/actions/products.jsx';
import ProductCard from '../../UI/ProductCard/';
import { useFilters } from '../../UI/Filter/useFilters.jsx';
import {
	setFiltersAction,
	filterProductsAction,
} from '../../../redux/reducers/productsReducer.jsx';
import BreadCrumbs from '../../UI/BreadCrumbs/index.jsx';

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
		<div className={`${s.all_products_container} content_line`}>
			<BreadCrumbs sectionName='All products' />

			<h1>All Products</h1>

			<Filter
				filters={localFilters}
				onFilterChange={handleFilterChange}
				showDiscountedItemsFilter={true}
			/>

			<div className={s.cards_container}>
				{filteredProducts.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}
