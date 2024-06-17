import s from './Header.module.css';
import ThemeButton from './ThemeButton/index';
import logo from '../../assets/img/logo.png';
import like from '../../assets/img/like.png';
import { NavLink, Link } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import Basket from '../Basket/index';
import { useNavigate } from 'react-router-dom';

export default function Header() {
	const navigate = useNavigate();
	const handleBasketClick = () => {
		navigate('/shopping_cart', { state: { from: 'Header' } });
	};

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
				<Link to='/liked_products'>
					<img src={like} alt='like' />
				</Link>
				<Link to='/shopping_cart' className={s.shopping_cart}>
					<Basket onClick={handleBasketClick} />
				</Link>
				<RxHamburgerMenu className={s.burger} />
			</div>
		</header>
	);
}
