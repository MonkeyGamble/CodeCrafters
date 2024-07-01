import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DiscountProducts from '../../DiscountProducts';
import { getAllProducts } from '../../../asyncActions/products';
import s from './DiscountedItemsPage.module.css';
import { Link } from 'react-router-dom';
import Filter from '../../Filter';
import {
	setFiltersAction,
	filterProductsAction,
} from '../../../store/productsReducer';

export default function DiscountItemsPage() {
	const dispatch = useDispatch();
	const filters = useSelector(state => state.products.filters);
	const discountProducts = useSelector(
		state => state.products.discountProducts
	);

	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

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
				products={discountProducts}
				header='Discounted Items'
				styles={s}
				filter={
					<Filter
						showDiscountedItemsFilter={false}
						minPrice={filters.minPrice}
						maxPrice={filters.maxPrice}
						sortOrder={filters.sortOrder}
					/>
				}
			/>
		</div>
	);
}
