import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import s from './Filter.module.css';
import { filterProductsAction } from '../../../redux/reducers/productsReducer';

const Filter = ({
	filters,
	onFilterChange,
	showDiscountedItemsFilter = true,
}) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(filterProductsAction());
	}, [filters, dispatch]);

	const handleFilterChange = (key, value) => {
		onFilterChange(key, value);
	};

	return (
		<section className={s.filter}>
			<div className={s.filter_price}>
				<p>Price</p>
				<input
					type='text'
					placeholder='From'
					value={filters.minPrice}
					onChange={e => handleFilterChange('minPrice', e.target.value)}
				/>
				<input
					type='text'
					placeholder='to'
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
					<option value='default'>by default</option>
					<option value='priceAsc'>price: low-high</option>
					<option value='priceDesc'>price: high-low</option>
					<option value='alphabetical'>alphabetical</option>
				</select>
			</div>
		</section>
	);
};

export default Filter;
