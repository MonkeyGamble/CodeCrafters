import React from 'react';
import s from './Like.module.css';
import like from '../../assets/img/like_white.png';
import like_dark from '../../assets/img/like_darkTheme.png';
import isLiked from '../../assets/img/like_isLiked.png';
import { useSelector } from 'react-redux';

export default function Like({ product, onClick, ...otherProps }) {
	const isLight = useSelector(state => state.theme.isLight);
	const isFavorite = useSelector(state =>
		state.products.favoriteProducts.some(
			favProduct => favProduct.id === product.id
		)
	);
	console.log('Like isFavorite: ', isFavorite ? 'true' : 'false');

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
		<img
			src={product.isFavorite ? isLiked : like}
			alt='like'
			className={s.like}
			onClick={handleClick}
			{...otherProps}
		/>
	);
}
