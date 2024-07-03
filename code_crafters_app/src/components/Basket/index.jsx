import React, { useEffect } from 'react';
import shopping_cart from '../../assets/img/shopping_cart_white.png';
import shopping_cart_dark from '../../assets/img/shopping_cart_darkTheme.png'; // Добавили новую картинку
import { useSelector } from 'react-redux';
import s from './Basket.module.css';

export default function Basket({ product, onClick, showCount, ...otherProps }) {
	const isLight = useSelector(state => state.theme.isLight);
	const basketItemsCount = useSelector(state => state.basket.basket.itemsCount);

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
			<img src={isLight ? shopping_cart : shopping_cart_dark} alt='cart' />
			{basketItemsCount > 0 && showCount && (
				<div className={s.circle_counter}>{basketItemsCount}</div>
			)}
		</div>
	);
}
