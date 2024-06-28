import React, { useEffect } from 'react';
import shopping_cart from '../../assets/img/shopping_cart_white.png';
import shopping_cart_dark from '../../assets/img/shopping_cart_darkTheme.png'; // Добавили новую картинку
import { useSelector } from 'react-redux';
import s from './Basket.module.css';

export default function Basket({ product, onClick, ...otherProps }) {
	const isLight = useSelector(state => state.theme.isLight);
	const basketItems = useSelector(state => state.basket.items);

	useEffect(() => {
		console.log(basketItems);
	}, ['Basket Items: ' + basketItems]);

	const basketItemsCount = basketItems ? basketItems.length : 0;

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
			<img src={isLight ? shopping_cart : shopping_cart_dark} alt='cart' />
			<div className={s.circle_counter}>{basketItemsCount}</div>
		</div>
	);
}
