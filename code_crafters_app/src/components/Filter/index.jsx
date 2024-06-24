import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './Filter.module.css';
import {
	setFiltersAction,
	filterProductsAction,
} from '../../store/productsReducer';

const Filter = ({ showDiscountedItemsFilter = true, ...otherProps }) => {
	const dispatch = useDispatch();
	const filters = useSelector(state => state.products.filters);
	const products = useSelector(state => state.products.allProducts);

	useEffect(() => {
		dispatch(filterProductsAction());
	}, [filters, products, dispatch]);

	const handleFilterChange = (key, value) => {
		dispatch(
			setFiltersAction({
				...filters,
				[key]: value,
			})
		);
	};

	return (
		<section className={s.filter}>
			<div className={s.filter_price}>
				<p>Цена</p>
				<input
					type='text'
					placeholder='от'
					value={filters.minPrice}
					onChange={e => handleFilterChange('minPrice', e.target.value)}
				/>
				<input
					type='text'
					placeholder='до'
					value={filters.maxPrice}
					onChange={e => handleFilterChange('maxPrice', e.target.value)}
				/>
			</div>

			{showDiscountedItemsFilter && (
				<div className={s.filter_discounted_items}>
					<label htmlFor='discounted_items'>Discounted items</label>
					<input
						type='checkbox'
						id='discounted_items'
						checked={filters.isDiscounted}
						onChange={e => handleFilterChange('isDiscounted', e.target.checked)}
					/>
				</div>
			)}

			<div className={s.filter_sort}>
				<label htmlFor='filter_sort'>Sorted</label>
				<select
					value={filters.sortOrder}
					onChange={e => handleFilterChange('sortOrder', e.target.value)}
				>
					<option value='default'>по умолчанию</option>
					<option value='priceAsc'>по цене (возрастание)</option>
					<option value='priceDesc'>по цене (убывание)</option>
					<option value='alphabetical'>по алфавиту</option>
				</select>
			</div>
		</section>
	);
};

export default Filter;
