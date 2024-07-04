import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DiscountProducts from '../../Common/DiscountProducts';
import { getAllProducts } from '../../../redux/actions/products';
import s from './DiscountedItemsPage.module.css';
import Filter from '../../UI/Filter';
import { useFilters } from '../../UI/Filter/useFilters';
import {
	setFiltersAction,
	filterProductsAction,
} from '../../../redux/reducers/productsReducer';
import BreadCrumbs from '../../UI/BreadCrumbs';

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
			<BreadCrumbs sectionName='All sales' />

			<div className={s.cards_wrapper}>
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
		</div>
	);
}
