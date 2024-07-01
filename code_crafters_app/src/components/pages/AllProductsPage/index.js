import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import s from './AllProductsPage.module.css';
import ProductSkeleton from '../../ProductSkeleton/ProductSkeleton.js';
import Filter from '../../Filter/index.jsx';
import { getAllProducts } from '../../../asyncActions/products.js';
import ProductCard from '../../ProductCard/index.jsx';

const AllProductsPage = () => {
	const dispatch = useDispatch();
	const filters = useSelector(state => state.products.filters);
	const filteredProducts = useSelector(
		state => state.products.filteredProducts
	);
	const loading = useSelector(state => state.products.loading); // Использование состояния загрузки
	const [showSkeleton, setShowSkeleton] = useState(true);

	useEffect(() => {
		// Устанавливаем задержку на 3 секунды перед отображением скелетонов
		const timer = setTimeout(() => {
			setShowSkeleton(false); // После 3 секунд скелетоны прячутся
		}, 3000);

		return () => clearTimeout(timer); // Очищаем таймер при размонтировании компонента
	}, []);

	useEffect(() => {
		// Загружаем продукты только если скелетоны уже скрыты
		if (!showSkeleton) {
			dispatch(getAllProducts());
		}
	}, [dispatch, showSkeleton]);

	return (
		<div className={`${s.sale_container} content_line`}>
			<div className={s.nav_buttons}>
				<Link to='/'>
					<button className={s.first_button}>Main page</button>
				</Link>
				<div className={s.nav_line}></div>
				<Link to='/all_products'>
					<button className={s.second_button}>All products</button>
				</Link>
			</div>

			<div className={s.header_section}>
				<h1>All Products</h1>
			</div>
			<Filter
				minPrice={filters.minPrice}
				maxPrice={filters.maxPrice}
				isDiscounted={filters.isDiscounted}
				sortOrder={filters.sortOrder}
			/>

			<div className={s.cards_container}>
				{showSkeleton
					? // Вывод скелетонов загрузки, пока данные загружаются
					  Array.from({ length: 10 }).map((_, index) => (
							<ProductSkeleton key={index} />
					  ))
					: // Отображение списка отфильтрованных продуктов после загрузки
					  filteredProducts.map(product => (
							<ProductCard key={product.id} product={product} />
					  ))}
			</div>
		</div>
	);
};

export default AllProductsPage;
