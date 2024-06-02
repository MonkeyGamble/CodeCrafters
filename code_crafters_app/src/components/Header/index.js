import s from './Header.module.css';
import ThemeButton from './ThemeButton/index';
import logo from '../../assets/img/logo.png';
import like from '../../assets/img/like.png';
import shopping_cart from '../../assets/img/shopping_cart.png';
import { NavLink } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';

export default function Header() {
	return (
		<div className={s.container}>
			<div className={s.header_left}>
				<img src={logo} alt='logo' />
				<ThemeButton className={s.theme_button} />
			</div>
			<div className={s.header_center}>
				<div className={s.discount}>1 day discount!</div>
				<ul className={s.nav_menu}>
					<NavLink to='/'>
						<li>Main Page</li>
					</NavLink>
					<NavLink to='/categories'>
						<li>Categories</li>
					</NavLink>
					<NavLink to='/all_products'>
						<li>All Products</li>
					</NavLink>
					<NavLink to='/all_sales'>
						<li>All Sales</li>
					</NavLink>
				</ul>
			</div>

			<div className={s.header_right}>
				<NavLink to='/liked_products'>
					<img src={like} alt='like' />
				</NavLink>
				<NavLink to='/shopping_cart' className={s.shopping_cart}>
					<img src={shopping_cart} alt='cart' />
				</NavLink>
				<RxHamburgerMenu className={s.burger} />
			</div>
		</div>
	);
}
