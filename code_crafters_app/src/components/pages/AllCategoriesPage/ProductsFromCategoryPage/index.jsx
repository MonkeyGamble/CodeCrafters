import React, { useEffect, useState } from 'react';
import s from './ProductsFromCategoryPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
	addProductFavoriteAction,
	removeProductFavoriteAction,
	setFiltersAction,
} from '../../../../redux/reducers/productsReducer';
import { getProductsByCategoryId } from '../../../../redux/actions/products';
import '../../../../styles/Global.css';
import BreadCrumbs from '../../../UI/BreadCrumbs';
import ProductCard from '../../../UI/ProductCard';
import { useFilters } from '../../../UI/Filter/useFilters';
import Filter from '../../../UI/Filter';
import { filterProducts } from '../../../UI/Filter/filterUtils';

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
	const [filteredCategoryProducts, setFilteredCategoryProducts] = useState([]);

	useEffect(() => {
		dispatch(getProductsByCategoryId(id));
	}, [dispatch, id]);

	useEffect(() => {
		dispatch(setFiltersAction(localFilters));
	}, [localFilters, dispatch]);

	useEffect(() => {
		if (productsByCategory.data) {
			setFilteredCategoryProducts(
				filterProducts(productsByCategory.data, filters)
			);
		}
	}, [productsByCategory, filters]);

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
						{filteredCategoryProducts.map(product => (
							<ProductCard
								key={product.id}
								product={product}
								onFavoriteClick={e => handleFavoriteClick(e, product)}
								style={s}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
}
