import React, { useState } from 'react';
import s from './ThemeButton.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../../store/themeButtonReducer';
import moon from '../../../assets/img/moon.png';
import sun from '../../../assets/img/sun.png';

export default function ThemeButton() {
	const isLight = useSelector(state => state.theme.isLight);
	const dispatch = useDispatch();
	const [containerBcg, setContainerBcg] = useState('grey');
	const handleTheme = () => {
		dispatch(toggleTheme());
		setContainerBcg(isLight ? 'white' : 'grey');
	};

	return (
		<div
			className={s.container}
			style={{ backgroundColor: containerBcg }}
			onClick={handleTheme}
		>
			<div className={`${s.circle} ${isLight ? s.light : s.dark}`}></div>
			<div className={s.space_elements}>
				<img src={sun} alt='sun' className={s.sun} />
				<img src={moon} alt='moon' className={s.moon} />
			</div>
		</div>
	);
}
