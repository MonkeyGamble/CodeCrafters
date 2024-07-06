import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DiscountProducts from '../../Common/DiscountProducts';
import { getAllProducts } from '../../../redux/actions/products';
import s from './DiscountedItemsPage.module.css';
import Filter from '../../UI/Filter';
import { useFilters } from '../../UI/Filter/useFilters';
import {
	setFiltersAction,
	filterProductsAction,
	setLoadingSkeleton,
} from '../../../redux/reducers/productsReducer';
import BreadCrumbs from '../../UI/BreadCrumbs';
import ProductSkeleton from '../../Widgets/ProductSkeleton/productSkeleton';

export default function DiscountItemsPage() {
	const dispatch = useDispatch();
	const filteredProducts = useSelector(
		state => state.products.filteredProducts
	);
	const loadingSkeleton = useSelector(state => state.products.loadingSkeleton); // Получение состояния loadingSkeleton
	const filters = useSelector(state => state.products.filters);

	const [localFilters, handleFilterChange] = useFilters({
		minPrice: '',
		maxPrice: '',
		isDiscounted: true,
		sortOrder: 'default',
	});

	const [showSkeleton, setShowSkeleton] = useState(true);

	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

	useEffect(() => {
		dispatch(setFiltersAction(localFilters));
	}, [localFilters, dispatch]);

	useEffect(() => {
		dispatch(filterProductsAction());
	}, [filters, dispatch]);

	useEffect(() => {
		// Устанавливаем showSkeleton в false через 2 секунды
		const timer = setTimeout(() => {
			setShowSkeleton(false); // Устанавливаем состояние showSkeleton в false
			dispatch(setLoadingSkeleton(false)); // Устанавливаем состояние загрузки скелетона в false
		}, 1000);

		return () => clearTimeout(timer); // Очищаем таймер при размонтировании компонента
	}, [dispatch]);

	return (
		<div className={`${s.discount_wrapper} content_line`}>
			<BreadCrumbs sectionName='All sales' />

			<div className={s.cards_wrapper}>
				{showSkeleton || loadingSkeleton ? (
					// Если showSkeleton или loadingSkeleton равен true, показываем скелетоны
					<div className={s.skeleton_wrapper}>
						<h1>Discounted items</h1>
						<Filter
							filters={localFilters}
							onFilterChange={handleFilterChange}
							showDiscountedItemsFilter={false}
						/>
						<div className={s.skeleton}>
							{Array.from({ length: 8 }).map((_, index) => (
								<ProductSkeleton key={index} />
							))}
						</div>
					</div>
				) : (
					// Иначе отображаем реальные отфильтрованные продукты
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
				)}
			</div>
		</div>
	);
}
