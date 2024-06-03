import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './Header.module.css';
import '../../Global.css';
import ThemeButton from './ThemeButton/index';
import logo from '../../assets/img/logo.png';
import like from '../../assets/img/like.png';
import shopping_cart from '../../assets/img/shopping_cart.png';
import { NavLink } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { RxCross2 } from 'react-icons/rx';
import { closeModalAction, openModalAction } from '../../store/modalReducer';

export default function Header() {
	const isModalOpen = useSelector(state => state.modal.isModalOpen);
	const dispatch = useDispatch();

	const modalMenuOpenHandler = () => {
		dispatch(openModalAction());
	};

	const modalMenuCloseHandler = () => {
		dispatch(closeModalAction());
	};

	return (
		<header className={`${s.container} content_line`}>
			<div className={s.header_left}>
				<img src={logo} alt='logo' />
				<ThemeButton className={s.theme_button} />
			</div>

			<div className={s.header_center}>
				<div className={s.discount}>1 day discount!</div>

				<nav>
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
				</nav>
			</div>

			<div className={s.header_right}>
				<NavLink to='/liked_products'>
					<img src={like} alt='like' />
				</NavLink>
				<NavLink to='/shopping_cart' className={s.shopping_cart}>
					<img src={shopping_cart} alt='cart' />
				</NavLink>

				<RxHamburgerMenu className={s.burger} onClick={modalMenuOpenHandler} />

				<div className={`${s.modal_menu} ${isModalOpen ? s.active : ''}`}>
					<RxCross2
						className={`${s.cross} ${isModalOpen ? s.active : ''}`}
						onClick={modalMenuCloseHandler}
					/>
					<nav>
						<ul className={`${s.nav_menu} ${isModalOpen ? s.active : ''}`}>
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
					</nav>
					<div className={`${s.discount} ${isModalOpen ? s.active : ''}`}>
						1 day discount!
					</div>
				</div>
			</div>
		</header>
	);
}
