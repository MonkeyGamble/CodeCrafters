import React from 'react';
import shopping_cart from '../../../assets/img/shopping_cart_white.png';
import shopping_cart_dark from '../../../assets/img/shopping_cart_darkTheme.png';
import productInBasket from '../../../assets/img/shopping_cart_added.png';
import { useSelector } from 'react-redux';
import s from './Basket.module.css';
import CounterCircle from '../CounterCircle/index';

export default function Basket({
	product,
	onClick,
	showCount,
	darkTheme,
	...otherProps
}) {
	const basketItemsCount = useSelector(
		state => state.basket.basket.itemsCount || 0
	);
	const basketItems = useSelector(state => state.basket.basket.items);

	const inBasket =
		product && basketItems.some(baskProduct => baskProduct.id === product.id);

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
		<div onClick={handleClick} {...otherProps} className={s.basket_container}>
			<img
				src={
					darkTheme
						? shopping_cart_dark
						: inBasket
						? productInBasket
						: shopping_cart
				}
				alt='cart'
			/>
			{basketItemsCount > 0 && showCount && (
				<CounterCircle count={basketItemsCount} />
			)}
		</div>
	);
}
