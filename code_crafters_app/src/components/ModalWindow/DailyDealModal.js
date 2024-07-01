import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { ROOT_URL } from '../..';
import s from './DailyDealModal.module.css';
import { setCurrentProductAction } from '../../store/productsReducer';
import { addProductToBasketAction } from '../../store/basketReducer';
import like from '../../assets/img/like_white.png';

import { RxCross2 } from 'react-icons/rx';

const DailyDealModal = ({
	isOpen,
	onRequestClose,
	product,
	setCurrentProduct,
	addToBasket,
	type,
}) => {
	const [currentProductLocal, setCurrentProductLocal] = useState(null);
	const [loading, setLoading] = useState(false);
	const [isAdded, setIsAdded] = useState(false);
	const [favorites, setFavorites] = useState([]); // Добавлено состояние для избранного

	useEffect(() => {
		if (isOpen && !product) {
			setLoading(true);
			axios
				.get(`${ROOT_URL}products/all`)
				.then(response => {
					const products = response.data;
					const randomProduct =
						products[Math.floor(Math.random() * products.length)];
					setCurrentProduct(randomProduct);
					setCurrentProductLocal(randomProduct);
					setLoading(false);
				})
				.catch(error => {
					console.error('Error fetching products:', error);
					setLoading(false);
				});
		}
	}, [isOpen, product, setCurrentProduct]);

	useEffect(() => {
		if (!isOpen) {
			setIsAdded(false); // Сброс состояния кнопки при закрытии модального окна
		}
	}, [isOpen]);

	if (!isOpen || (loading && !product)) return null;

	const displayedProduct = product || currentProductLocal;

	if (!displayedProduct) return null;

	const calculateDiscountPrice = price => {
		if (price === '') return '';

		const originalPrice = parseFloat(price);
		const discountedPrice = (originalPrice * 0.5).toFixed(2); // 50% скидка

		return discountedPrice;
	};

	const price =
		displayedProduct.price !== undefined
			? displayedProduct.price.toFixed(2)
			: '';
	const discountPrice = calculateDiscountPrice(price);

	const handleAddToCart = () => {
		const productToAdd = {
			...displayedProduct,
			count: 1,
			discont_price: discountPrice, // Устанавливаем скидочную цену
		};
		addToBasket(productToAdd);
		setIsAdded(true); // Обновляем состояние после добавления товара
		console.log('Added product to basket:', productToAdd);
	};

	const handleAddToFavorites = () => {
		setFavorites([...favorites, displayedProduct]);
		console.log('Added product to favorites:', displayedProduct);
	};

	const handleModalClick = e => {
		if (e.target.className === 'modal') {
			onRequestClose();
		}
	};

	return (
		<div className={s.modal} onClick={handleModalClick}>
			<div className={s.modalContent}>
				<RxCross2 className={s.close} onClick={onRequestClose} />

				{type === 'deal' ? (
					<>
						<div className={s.modalHeader}>
							<h2>50% discount on product of the day!</h2>
						</div>
						<div className={s.productDetails}>
							<div className={s.discountBadge}>-50%</div>

							<div
								className={s.product_picture}
								style={{
									backgroundImage: `url(${ROOT_URL + displayedProduct.image})`,
								}}
							/>

							<img
								src={like}
								alt='like'
								className={s.like_icon}
								onClick={handleAddToFavorites}
							/>

							<h2>{displayedProduct.title}</h2>

							<div className={s.priceWrapper}>
								<h3 className={s.discountPrice}>${discountPrice}</h3>
								<h5 className={s.originalPrice}>${price}</h5>
							</div>
						</div>
						<button className={s.addToCart} onClick={handleAddToCart}>
							{isAdded ? 'Added product to basket' : 'Add to Cart'}
						</button>
					</>
				) : (
					<div className={s.congratulations}>
						<h2>Congratulations</h2>
						<p>Your order has been successfully placed on the website.</p>
						<p>A manager will contact you shortly to confirm your order.</p>
					</div>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	product: state.products.currentProduct || null,
});

const mapDispatchToProps = dispatch => ({
	setCurrentProduct: product => dispatch(setCurrentProductAction(product)),
	addToBasket: product => dispatch(addProductToBasketAction(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DailyDealModal);
