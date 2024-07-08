import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../../UI/ProductCard/index';
import s from './FavoriteProductsPage.module.css';
import { Link } from 'react-router-dom';
import Filter from '../../UI/Filter';
import { useFilters } from '../../UI/Filter/useFilters';
import { setFiltersAction } from '../../../redux/reducers/productsReducer';
import { filterProducts } from '../../UI/Filter/filterUtils';
import ProductSkeleton from '../../Widgets/ProductSkeleton/productSkeleton';
import { setLoadingSkeleton } from '../../../redux/reducers/productsReducer';
import BreadCrumbs from '../../UI/BreadCrumbs';

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
	const [showSkeleton, setShowSkeleton] = useState(true); // Состояние для отображения скелетона

	useEffect(() => {
		dispatch(setFiltersAction(localFilters));
	}, [localFilters, dispatch]);

	useEffect(() => {
		setFilteredFavoriteProducts(filterProducts(favoriteProducts, filters));
	}, [favoriteProducts, filters]);

	useEffect(() => {
		// Устанавливаем showSkeleton в false через 1 секунду
		const timer = setTimeout(() => {
			setShowSkeleton(false);
		}, 1000);

		return () => clearTimeout(timer); // Очищаем таймер при размонтировании компонента
	}, []);

	useEffect(() => {
		// Имитация загрузки данных
		setTimeout(() => {
			dispatch(setLoadingSkeleton(false)); // Устанавливаем состояние загрузки в false
		}, 1000);
	}, [dispatch]);

	return (
		<div className={`${s.favorite_wrapper} content_line`}>
			<BreadCrumbs sectionName='Favorite products' />

			<h1>Liked products</h1>

			{showSkeleton ? (
				// Если showSkeleton равен true, показываем скелетоны
				<div className={s.productsList}>
					{Array.from({ length: 8 }).map((_, index) => (
						<ProductSkeleton key={index} />
					))}
				</div>
			) : favoriteProducts.length === 0 ? (
				// Если данных нет, показываем сообщение
				<div className={s.empty_cart}>
					<p>
						Looks like you have no items in your favorite products currently.
					</p>
					<Link to='/all_products'>
						<button>Continue Shopping</button>
					</Link>
				</div>
			) : (
				// Иначе отображаем отфильтрованные избранные продукты
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
