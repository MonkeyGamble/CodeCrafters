import React, { useEffect, useState } from 'react';
import s from './ProductItem.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../../asyncActions/products';
import { getAllCategories } from '../../../asyncActions/categories';
import { Link } from 'react-router-dom';
import { ROOT_URL } from '../../../Global'; // Поправил путь импорта
import Counter from '../../Counter/index.jsx';
import { useBasketActions } from '../../../asyncActions/basket';
import ProductSkeleton from '../../ProductSkeleton/ProductSkeleton';
import {
	addProductFavoriteAction,
	removeProductFavoriteAction,
} from '../../../store/productsReducer.js';
import Like from '../../Like/index.jsx';

export default function ProductItemPage() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const product = useSelector(state => state.products.product);
	const categories = useSelector(state => state.categories.allCategories);
	const { addProductToBasket } = useBasketActions();
	const [count, setCount] = useState(1); // Локальное состояние для количества товара
	const isFavorite = useSelector(state =>
		state.products.favoriteProducts.some(
			favProduct => favProduct.id === product.id
		)
	);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		dispatch(getProductById(id));
		dispatch(getAllCategories());
	}, [dispatch, id]);

	useEffect(() => {
		// Имитация задержки загрузки данных
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	const handleFavoriteClick = () => {
		const updatedProduct = { ...product, isFavorite: !isFavorite };
		if (isFavorite) {
			dispatch(removeProductFavoriteAction(product.id));
		} else {
			dispatch(addProductFavoriteAction(updatedProduct));
		}
	};

	const handleIncrement = () => {
		setCount(prevCount => prevCount + 1);
	};

	const handleDecrement = () => {
		setCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
	};

	const handleAddToCart = () => {
		const productToAdd = { ...product, count };
		addProductToBasket(productToAdd);
	};

	return (
		<div className={`${s.product_wrapper} content_line`}>
			{/* Навигационная панель */}
			<div className={s.nav_buttons}>
				<Link to='/'>
					<button className={s.main_button}>Main page</button>
				</Link>
				<div className={s.nav_line}></div>
				<Link to='/all_categories'>
					<button className={s.section_button}>Categories</button>
				</Link>
				<div className={s.nav_line}></div>
				<Link
					to={`/categories/${
						categories.find(category => category.id === product.categoryId)?.id
					}`}
				>
					<button className={s.category_name_button}>
						{
							categories.find(category => category.id === product.categoryId)
								?.title
						}
					</button>
				</Link>
				<div className={s.nav_line}></div>
				<button className={s.product_name_button}>{product.title}</button>
			</div>

			{/* Отображение контента или скелетонов загрузки */}
			{loading ? (
				<div className={s.skeleton_container}>
					{Array.from({ length: 10 }).map((_, index) => (
						<ProductSkeleton key={index} />
					))}
				</div>
			) : (
				<div className={s.product_card}>
					{/* Изображение товара */}
					<img src={`${ROOT_URL}${product.image}`} alt={product.title} />
					<div className={s.product_description}>
						<div className={s.product_header}>
							{/* Заголовок и кнопка Like */}
							<h1>{product.title}</h1>
							<Like onClick={handleFavoriteClick} product={product} />
						</div>
						<div className={s.price_section}>
							{/* Цена товара */}
							{product.discount_price ? (
								<>
									<div className={s.product_price}>
										<h2>${product.discount_price}</h2>
										<h5>${product.price}</h5>
									</div>
									<div className={s.discount_size}>
										-
										{Math.round(
											(1 - product.discount_price / product.price) * 100
										)}
										%
									</div>
								</>
							) : (
								<h2>${product.price}</h2>
							)}
						</div>
						{/* Счетчик и кнопка добавления в корзину */}
						<div className={s.add_to_cart}>
							<Counter
								count={count}
								onIncrement={handleIncrement}
								onDecrement={handleDecrement}
							/>
							<button className={s.add_button} onClick={handleAddToCart}>
								Add to cart
							</button>
						</div>
						{/* Описание товара */}
						<p>{product.description}</p>
					</div>
				</div>
			)}
		</div>
	);
}
