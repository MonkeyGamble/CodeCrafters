import s from './Header.module.css';
import ThemeButton from './ThemeButton/index';
import logo from '../../assets/img/logo.png';
import like from '../../assets/img/like.png';
// import shopping_cart from '../../assets/img/shopping_cart.png';
import { NavLink, Link } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import Basket from '../Basket/index';

export default function Header() {
	return (
		<header className={`${s.container} ${s.content_line}`}>
			<div className={s.header_left}>
				<Link to='/'>
					<img src={logo} alt='logo' />
				</Link>

				<ThemeButton className={s.theme_button} />
			</div>

			<div className={s.header_center}>
				<Link to='/all_sales'>
					<div className={s.discount}>1 day discount!</div>
				</Link>

				<nav>
					<ul className={s.nav_menu}>
						<NavLink to='/'>
							<li>Main Page</li>
						</NavLink>
						<NavLink to='/all_categories'>
							<li>Categories</li>
						</NavLink>
						<NavLink to='/all_products'>
							<li>All Products</li>
						</NavLink>
						<NavLink to='/all_sales'>
							<li>All Sales</li>
						</NavLink>
					</ul>
				</nav>
			</div>

			<div className={s.header_right}>
				<NavLink to='/liked_products'>
					<img src={like} alt='like' />
				</NavLink>
				<NavLink to='/shopping_cart' className={s.shopping_cart}>
					<Basket addToCart={false} />
					{/* <img src={shopping_cart} alt='cart' /> */}
				</NavLink>

				<RxHamburgerMenu className={s.burger} />
			</div>
		</header>
	);
}
