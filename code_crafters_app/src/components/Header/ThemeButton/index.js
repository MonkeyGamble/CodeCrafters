import s from './ThemeButton.module.css';
import moon from '../../../assets/img/moon.png';
import sun from '././../../../assets/img/sun.png';

export default function ThemeButton() {
	return (
		<div className={s.container}>
			<div className={s.circle}></div>
			<div className={s.moon}>
				<img src={moon} alt='moon' />
			</div>
		</div>
	);
}
