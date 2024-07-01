import React from 'react';
import like from '../../assets/img/like_white.png';
import like_dark from '../../assets/img/like_dark.png';
import isLiked from '../../assets/img/like_isLiked.png';
import s from './Like.module.css';

export default function like() {
	return <img src={like} alt='like' className={s.like} />;
}
