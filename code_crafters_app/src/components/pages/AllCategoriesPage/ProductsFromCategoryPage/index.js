import { useParams } from 'react-router-dom';
import s from './ProductsFromCategoryPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProductsByCategoryId } from '../../../../asyncActions/products';
import { ROOT_URL } from '../../../..';
import '../../../../Global.css';
import { Link } from 'react-router-dom';
import like from '../../../../assets/img/like_white.png';
import shopping_cart from '../../../../assets/img/shopping_cart_white.png';

export default function ProductsFromCategoryPage() {
	const { id } = useParams();

	const dispatch = useDispatch();

	const productsByCategory = useSelector(
		store => store.products.productsFromCategory
	);

	useEffect(() => {
		dispatch(getProductsByCategoryId(id));
	}, [dispatch, id]);
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
							<div key={product.id} className={s.card}>
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
										<img src={like} alt='like' />
										<img src={shopping_cart} alt='cart' />
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
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
}
