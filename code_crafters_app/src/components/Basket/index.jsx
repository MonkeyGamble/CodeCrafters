import React from 'react';
import shopping_cart from '../../assets/img/shopping_cart_white.png';
import { useBasketActions } from '../../asyncActions/basket';

export default function Basket({ product, addToCart }) {
	const { addProductToBasket } = useBasketActions();

	const handleBasketClick = e => {
		e.preventDefault();
		e.stopPropagation(); // Предотвращаем всплытие события
		addToCart
			? addProductToBasket(product)
			: (window.location.href = '/shopping_cart');
	};
	return (
		<div onClick={handleBasketClick}>
			<img src={shopping_cart} alt='cart' />
		</div>
	);
}
