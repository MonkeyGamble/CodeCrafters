import React, { useEffect, useState } from 'react';
import s from './ProductItem.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../../redux/actions/products';
import { getAllCategories } from '../../../redux/actions/categories';
import { ROOT_URL } from '../../../index';
import '../../../styles/Global.css';
import Counter from '../../UI/Counter/index';
import { useBasketActions } from '../../../redux/actions/basket';
import Like from '../../UI/Like';
import BreadCrumbs from '../../UI/BreadCrumbs/index';
import DailyDealModal from '../../Widgets/ModalWindow/index';
import useHandleFavoriteClick from '../../../utils/handleFavoriteClick';

export default function ProductItemPage() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const product = useSelector(state => state.products.product);
	const categories = useSelector(state => state.categories.allCategories);
	const { addProductToBasket } = useBasketActions();
	const [count, setCount] = useState(1); // Локальное состояние для количества товара
	const handleFavoriteClick = useHandleFavoriteClick(product);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		dispatch(getProductById(id));
		dispatch(getAllCategories());
	}, [dispatch, id]);

	if (!product) {
		return <div>Loading...</div>;
	}

	const handleIncrement = () => {
		setCount(prevCount => prevCount + 1);
	};

	const handleDecrement = () => {
		setCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
	};

	const handleAddToCart = e => {
		e.preventDefault();
		e.stopPropagation();
		const productToAdd = { ...product, count };
		addProductToBasket(productToAdd);
	};

	const handleShowModal = () => {
		setShowModal(true);
	};

	return (
		<div className={`${s.product_wrapper} content_line`}>
			<BreadCrumbs
				product={product}
				sectionName='Categories'
				categoryName={
					categories.find(category => category.id === product.categoryId)?.title
				}
			/>

			<div className={s.product_card}>
				
				<div className={s.image_wrapper}>
					<img
						src={`${ROOT_URL}${product.image}`}
						alt={product.title}
						onClick={handleShowModal} // Обработчик для открытия модального окна
						className={s.product_image}
					/>
				</div>

				<div className={s.product_description}>
					<div className={s.product_header}>
						<h1>{product.title}</h1>
						<Like onClick={handleFavoriteClick} product={product} />
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
						<button className={s.add_button} onClick={handleAddToCart}>
							Add to cart
						</button>
					</div>
					
					<p>{product.description}</p>

				</div>

			</div>
			
			{showModal && (
				<DailyDealModal
					isOpen={true}
					onRequestClose={() => setShowModal(false)}
					type='product_card'
					picture={`${ROOT_URL}${product.image}`}
				/>
			)}
		</div>
	);
}
