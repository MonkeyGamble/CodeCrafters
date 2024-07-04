import React, { useEffect } from 'react';
import s from './ProductsFromCategoryPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
	addProductFavoriteAction,
	removeProductFavoriteAction,
} from '../../../../redux/reducers/productsReducer';
import {
	getAllProducts,
	getProductsByCategoryId,
} from '../../../../redux/actions/products';
import '../../../../styles/Global.css';
import BreadCrumbs from '../../../UI/BreadCrumbs';
import ProductCard from '../../../UI/ProductCard'; // Предположим, что у вас есть компонент ProductCard
import { useFilters } from '../../../UI/Filter/useFilters';
import Filter from '../../../UI/Filter';

import {
	setFiltersAction,
	filterProductsAction,
} from '../../../../redux/reducers/productsReducer';

export default function ProductsFromCategoryPage() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const productsByCategory = useSelector(
		store => store.products.productsFromCategory
	);
	const filters = useSelector(state => state.products.filters);
	const [localFilters, handleFilterChange] = useFilters({
		minPrice: '',
		maxPrice: '',
		isDiscounted: false,
		sortOrder: 'default',
	});
	useEffect(() => {
		dispatch(getProductsByCategoryId(id));
	}, [dispatch, id]);
	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

	useEffect(() => {
		dispatch(setFiltersAction(localFilters));
	}, [localFilters, dispatch]);

	useEffect(() => {
		dispatch(filterProductsAction());
	}, [filters, dispatch]);
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
		<div className={`${s.products_wrapper} content_line`}>
			{productsByCategory.category && productsByCategory.data && (
				<>
					<BreadCrumbs
						sectionName='Categories'
						categoryName={productsByCategory.category.title}
					/>

					<h1>{productsByCategory.category.title}</h1>

					<Filter
						filters={localFilters}
						onFilterChange={handleFilterChange}
						showDiscountedItemsFilter={true}
					/>

					<div className={s.cards_container}>
						{productsByCategory.data.map(product => (
							<ProductCard
								key={product.id}
								product={product}
								onFavoriteClick={e => handleFavoriteClick(e, product)}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
}
