import React, { useState, useEffect } from 'react';
import s from './ThemeButton.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../../../redux/reducers/themeButtonReducer';
import moon from '../../../../assets/img/moon.png';
import sun from '../../../../assets/img/sun.png';
import lightColors from '../../../../styles/lightColors';
import darkColors from '../../../../styles/darkColors';

const setCSSVariables = colors => {
	const root = document.documentElement;
	Object.keys(colors).forEach(key => {
		root.style.setProperty(`--${key}`, colors[key]);
	});
};

export default function ThemeButton() {
	const isLight = useSelector(state => state.theme.isLight);
	const dispatch = useDispatch();
	const [containerBcg, setContainerBcg] = useState(
		isLight ? '#8B8B8B' : '#ffffff'
	);

	useEffect(() => {
		setCSSVariables(isLight ? lightColors : darkColors);
		setContainerBcg(isLight ? '#8B8B8B' : '#ffffff');
	}, [isLight]);

	const handleTheme = () => {
		dispatch(toggleTheme());
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
