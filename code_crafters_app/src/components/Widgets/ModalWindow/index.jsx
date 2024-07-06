import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROOT_URL } from '../../../index';
import s from './DailyDealModal.module.css';
import {
	addProductFavoriteAction,
	removeProductFavoriteAction,
	setCurrentProductAction,
} from '../../../redux/reducers/productsReducer';
import { addProductToBasketAction } from '../../../redux/reducers/basketReducer';
import { RxCross2 } from 'react-icons/rx';
import { getAllProducts } from '../../../redux/actions/products';
import { useModalWindow } from '../../../redux/actions/modalWindow';
import Like from '../../UI/Like/index';

const DailyDealModal = ({ isOpen, onRequestClose, type }) => {
	const dispatch = useDispatch();
	const [currentProductLocal, setCurrentProductLocal] = useState(null);
	const [loading, setLoading] = useState(false);
	const [isAdded, setIsAdded] = useState(false);
	const [favorites, setFavorites] = useState([]);
	const { getRandomProduct } = useModalWindow();
	const products = useSelector(state => state.products.allProducts);
	const product = useSelector(state => state.products.currentProduct);
	const isFavorite = useSelector(state =>
		product ? state.products.favoriteProducts.some(favProduct => favProduct.id === product.id) : false
	);

	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

	useEffect(() => {
		if (isOpen && !product) {
			setLoading(true);
			const randomProduct = getRandomProduct(products);
			dispatch(setCurrentProductAction(randomProduct));
			setCurrentProductLocal(randomProduct);
			setLoading(false);
		}
	}, [dispatch, isOpen, product, getRandomProduct, products]);

	useEffect(() => {
		if (!isOpen) {
			setIsAdded(false);
		}
	}, [isOpen]);

	if (!isOpen || (loading && !product)) return null;

	const displayedProduct = product || currentProductLocal;

	if (!displayedProduct) return null;

	const calculateDiscountPrice = price => {
		if (price === '') return '';

		const originalPrice = parseFloat(price);
		const discountedPrice = (originalPrice * 0.5).toFixed(2);

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
			discount_price: discountPrice,
		};
		dispatch(addProductToBasketAction(productToAdd));
		setIsAdded(true);
		console.log('Added product to basket:', productToAdd);
	};

	const handleAddToFavorites = () => {
		setFavorites([...favorites, displayedProduct]);
		console.log('Added product to favorites:', displayedProduct);
	};

	const handleFavoriteClick = e => {
		const updatedProduct = { ...product, isFavorite: !isFavorite };
		if (isFavorite) {
			dispatch(removeProductFavoriteAction(product.id));
		} else {
			dispatch(addProductFavoriteAction(updatedProduct));
		}
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
							<div className={s.like_icon}>
								<Like onClick={handleFavoriteClick} product={product} />
							</div>
							<h2>{displayedProduct.title}</h2>
							<div className={s.priceWrapper}>
								<h3 className={s.discountPrice}>${discountPrice}</h3>
								<h5 className={s.originalPrice}>${price}</h5>
							</div>
						</div>
						<button
							className={s.addToCart}
							onClick={handleAddToCart}
							disabled={isAdded}
						>
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

export default DailyDealModal;
