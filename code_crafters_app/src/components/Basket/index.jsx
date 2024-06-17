import React from 'react';
import shopping_cart from '../../assets/img/shopping_cart_white.png';
// import { useBasketActions } from '../../asyncActions/basket';

export default function Basket({ product, ...otherProps }) {
	// const { addProductToBasket } = useBasketActions();

	// 	const handleBasketClick = e => {
	//  // Предотвращаем всплытие события
	// 		if (addToCart) {
	// 			e.stopPropagation();
	// 			addProductToBasket(product);
	// 		}
	// 	};
	
	return (
		<div {...otherProps}>
			<img src={shopping_cart} alt='cart' />
		</div>
	);
}
