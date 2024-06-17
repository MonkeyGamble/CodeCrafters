import React from 'react';
import shopping_cart from '../../assets/img/shopping_cart_white.png';

export default function Basket({ product, onClick, ...otherProps }) {
	const handleClick = e => {
		e.preventDefault();
		e.stopPropagation();
		if (typeof onClick === 'function') {
			onClick(e); // Вызываем переданную функцию onClick
		} else {
			console.error('onClick is not a function');
		}
	};
	return (
		<div onClick={handleClick} {...otherProps}>
			<img src={shopping_cart} alt='cart' />
		</div>
	);
}
