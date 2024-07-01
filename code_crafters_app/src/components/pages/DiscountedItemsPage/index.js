import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DiscountProducts from '../../DiscountProducts';
import { getAllProducts } from '../../../asyncActions/products';
import s from './DiscountedItemsPage.module.css';
import { Link } from 'react-router-dom';
import Filter from '../../Filter';
import { useFilters } from '../../Filter/useFilters';
import {
	setFiltersAction,
	filterProductsAction,
} from '../../../store/productsReducer';

export default function DiscountItemsPage() {
	const dispatch = useDispatch();
	const filteredProducts = useSelector(
		state => state.products.filteredProducts
	);
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
		<div className={`${s.discount_wrapper} content_line`}>
			<div className={s.nav_buttons}>
				<Link to='/'>
					<button className={s.first_button}>Main page</button>
				</Link>
				<div className={s.nav_line}></div>
				<Link to='/all_sales'>
					<button className={s.second_button}>All sales</button>
				</Link>
			</div>

			<DiscountProducts
				products={filteredProducts}
				header='Discounted Items'
				styles={s}
				filter={
					<Filter
						filters={localFilters}
						onFilterChange={handleFilterChange}
						showDiscountedItemsFilter={false}
					/>
				}
			/>
		</div>
	);
}
