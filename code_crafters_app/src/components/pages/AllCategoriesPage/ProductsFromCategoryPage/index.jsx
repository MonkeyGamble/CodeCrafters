import React, { useEffect } from 'react';
import s from './ProductsFromCategoryPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Like from '../../../UI/Like';
import Basket from '../../../UI/Basket';
import {
	addProductFavoriteAction,
	removeProductFavoriteAction,
} from '../../../../redux/reducers/productsReducer';
import { getProductsByCategoryId } from '../../../../redux/actions/products';
import { ROOT_URL } from '../../../..';
import '../../../../styles/Global.css';

export default function ProductsFromCategoryPage() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const productsByCategory = useSelector(
		store => store.products.productsFromCategory
	);

	useEffect(() => {
		dispatch(getProductsByCategoryId(id));
	}, [dispatch, id]);

	const handleFavoriteClick = (e, product) => {
		e.preventDefault();
		e.stopPropagation();
		const isFavorite = product.isFavorite; // Assuming product has isFavorite property
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
					<div className={s.nav_buttons}>
						<Link to='/'>
							<button className={s.main_button}>Main page</button>
						</Link>
						<div className={s.nav_line}></div>
						<Link to='/all_categories'>
							<button className={s.section_button}>Categories</button>
						</Link>
						<div className={s.nav_line}></div>
						<button className={s.section_name_button}>
							{productsByCategory.category.title}
						</button>
					</div>

					<div className={s.cards_container}>
						{productsByCategory.data.map(product => (
							<Link
								key={product.id}
								to={`/products/${product.id}`}
								className={s.card}
							>
								<div
									className={s.product_picture}
									style={{
										backgroundImage: `url(${ROOT_URL + product.image})`,
									}}
								>
									{product.discont_price !== null && (
										<div className={s.discount_size}>
											-
											{Math.round(
												(1 - product.discont_price / product.price) * 100
											)}
											%
										</div>
									)}
									<div className={s.like_cart}>
										<Like
											product={product}
											onClick={e => handleFavoriteClick(e, product)}
										/>
										<Basket product={product} />
									</div>
								</div>

								<div className={s.product_description}>
									<h3>{product.title}</h3>
									<div className={s.price}>
										<h2>${product.price}</h2>
										{product.discont_price !== null && (
											<h5>${product.discont_price}</h5>
										)}
									</div>
								</div>
							</Link>
						))}
					</div>
				</>
			)}
		</div>
	);
}
