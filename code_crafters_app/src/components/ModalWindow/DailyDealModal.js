import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROOT_URL } from '../..';
import s from './DailyDealModal.module.css';
import { setCurrentProductAction } from '../../store/productsReducer';
import { addProductToBasketAction } from '../../store/basketReducer';
import like from '../../assets/img/like_white.png';
import { RxCross2 } from 'react-icons/rx';
import { getAllProducts } from '../../asyncActions/products';

const DailyDealModal = ({ isOpen, onRequestClose }) => {
	const dispatch = useDispatch();
	const product = useSelector(state => state.products.currentProduct);
	const products = useSelector(state => state.products.allProducts);
	const [isAdded, setIsAdded] = useState(false);
	const [favorites, setFavorites] = useState([]); // Добавлено состояние для избранного

	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

	useEffect(() => {
		if (isOpen && !product && products.length > 0) {
			const randomProduct =
				products[Math.floor(Math.random() * products.length)];
			dispatch(setCurrentProductAction(randomProduct));
		}
	}, [isOpen, product, products, dispatch]);

	useEffect(() => {
		if (!isOpen) {
			setIsAdded(false); // Сброс состояния кнопки при закрытии модального окна
		}
	}, [isOpen]);

	if (!isOpen || !product) return null;

	const calculateDiscountPrice = price => {
		if (price === '') return '';
		const originalPrice = parseFloat(price);
		const discountedPrice = (originalPrice / 2).toFixed(2); // 50% скидка
		return discountedPrice;
	};

	const price = product.price !== undefined ? product.price.toFixed(2) : '';
	const discountPrice = calculateDiscountPrice(price);

	const handleAddToCart = () => {
		const productToAdd = {
			...product,
			count: 1,
			discont_price: discountPrice, // Устанавливаем скидочную цену
		};
		dispatch(addProductToBasketAction(productToAdd));
		setIsAdded(true); // Обновляем состояние после добавления товара
	};

	const handleAddToFavorites = () => {
		setFavorites([...favorites, product]);
		console.log('Added product to favorites:', product);
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
				<div className={s.modalHeader}>
					<h2>50% discount on product of the day!</h2>
				</div>
				<div className={s.productDetails}>
					<div className={s.discountBadge}>-50%</div>
					<div
						className={s.product_picture}
						style={{
							backgroundImage: `url(${ROOT_URL + product.image})`,
						}}
					/>
					<img
						src={like}
						alt='like'
						className={s.like_icon}
						onClick={handleAddToFavorites}
					/>
					<h2>{product.title}</h2>
					<div className={s.priceWrapper}>
						<h3 className={s.discountPrice}>${discountPrice}</h3>
						<h5 className={s.originalPrice}>${price}</h5>
					</div>
				</div>
				<button
					className={s.addToCart}
					onClick={handleAddToCart}
					disabled={isAdded}
					style={{
						cursor: isAdded ? 'not-allowed' : 'pointer',
					}}
				>
					{isAdded ? 'Added product to basket' : 'Add to Cart'}
				</button>
			</div>
		</div>
	);
};

export default DailyDealModal;
