import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../../../redux/actions/products';
import s from './DiscountedItemsPage.module.css';
import Filter from '../../UI/Filter';
import { useFilters } from '../../UI/Filter/useFilters';
import {
	setFiltersAction,
	filterProductsAction,
	setLoadingSkeleton,
	removeProductFavoriteAction,
	addProductFavoriteAction,
} from '../../../redux/reducers/productsReducer';
import BreadCrumbs from '../../UI/BreadCrumbs';
import ProductSkeleton from '../../Widgets/ProductSkeleton/productSkeleton';
import ProductCard from '../../UI/ProductCard';

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

	const handleFavoriteClick = (e, product) => {
		e.preventDefault();
		e.stopPropagation();
		const isFavorite = product.isFavorite;
		const updatedProduct = { ...product, isFavorite: !isFavorite };
		if (isFavorite) {
			dispatch(removeProductFavoriteAction(product.id));
		} else {
			dispatch(addProductFavoriteAction(updatedProduct));
		}
	};

	return (
		<div className={`${s.discount_wrapper} content_line`}>
			<BreadCrumbs sectionName='All sales' />

			<div className={s.cards_wrapper}>
				<h1>Discounted items</h1>
				<Filter
					filters={localFilters}
					onFilterChange={handleFilterChange}
					showDiscountedItemsFilter={false}
				/>
				{showSkeleton || loadingSkeleton ? (
					// Если showSkeleton или loadingSkeleton равен true, показываем скелетоны
					<div className={s.skeleton}>
						{Array.from({ length: 8 }).map((_, index) => (
							<ProductSkeleton key={index} />
						))}
					</div>
				) : (
					<div className={s.cards_container}>
						{filteredProducts.map(product => (
							<ProductCard
								key={product.id}
								product={product}
								onFavoriteClick={e => handleFavoriteClick(e, product)}
								style={s}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
