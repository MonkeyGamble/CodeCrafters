import React from 'react';
import s from './Like.module.css';
import like from '../../../assets/img/like_white.png';
import like_dark from '../../../assets/img/like_darkTheme.png';
import isLiked from '../../../assets/img/like_isLiked.png';
import { useSelector } from 'react-redux';
import CounterCircle from '../CounterCircle/index';

export default function Like({
	product,
	onClick,
	showCount,
	darkTheme,
	...otherProps
}) {
	const favoriteProductsCount = useSelector(
		state => state.products.favoriteProductsCount || 0
	);
	const favoriteProducts = useSelector(
		state => state.products.favoriteProducts || []
	);

	const isFavorite = product
		? favoriteProducts.some(favProduct => favProduct.id === product.id)
		: false; //isFavorite проверяет пропс продукта и возвращает false, если продукт не передан. Таким образом, компонент можно использовать как для карточки продукта, так и для общего отображения в Header.

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
		<div onClick={handleClick} {...otherProps} className={s.like_container}>
			<img
				src={darkTheme ? like_dark : isFavorite ? isLiked : like}
				alt='like'
			/>
			{favoriteProductsCount > 0 && showCount && (
				<CounterCircle count={favoriteProductsCount} />
			)}
		</div>
	);
}
