import React, { useEffect, useState } from 'react';
import s from './ProductItem.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../../asyncActions/products';
import { getAllCategories } from '../../../asyncActions/categories';
import { Link } from 'react-router-dom';
import { ROOT_URL } from '../../..';
import '../../../Global.css';
import like from '../../../assets/img/like_white.png';
import Counter from '../../Counter/index.jsx';
import { useBasketActions } from '../../../asyncActions/basket';
import { addProductFavorite } from '../../../asyncActions/products';

export default function ProductItemPage() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const product = useSelector(state => state.products.product);
	const categories = useSelector(state => state.categories.allCategories);
	const { addProductToBasket } = useBasketActions();
	const [count, setCount] = useState(1); // Локальное состояние для количества товара

	useEffect(() => {
		dispatch(getProductById(id));
		dispatch(getAllCategories());
	}, [dispatch, id]);

	if (!product) {
		return <div>Loading...</div>;
	}

	const handleAddProductFavorite = () => {
		dispatch(addProductFavorite(product)); // Вызываем экшен для добавления в избранное
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

			<div className={s.product_card}>
				<img src={`${ROOT_URL}${product.image}`} alt={product.title} />
				<div className={s.product_description}>
					<div className={s.product_header}>
						<h1>{product.title}</h1>
						<img onClick={handleAddProductFavorite} src={like} alt='like' />
					</div>
					<div className={s.price_section}>
						{product.discont_price ? (
							<>
								<div className={s.product_price}>
									<h2>${product.discont_price}</h2>
									<h5>${product.price}</h5>
								</div>
								<div className={s.discount_size}>
									-
									{Math.round(
										(1 - product.discont_price / product.price) * 100
									)}
									%
								</div>
							</>
						) : (
							<h2>${product.price}</h2>
						)}
					</div>
					<div className={s.add_to_cart}>
						<Counter
							count={count}
							onIncrement={handleIncrement}
							onDecrement={handleDecrement}
						/>
						{/* Передаем productId в Counter */}
						<button className={s.add_button} onClick={handleAddToCart}>
							Add to cart
						</button>
					</div>

					<p>{product.description}</p>
				</div>
			</div>
		</div>
	);
}
