import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import s from './Header.module.css';
import ThemeButton from './ThemeButton/index';
import logo from '../../../assets/img/logo.png';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import Basket from '../../UI/Basket/index';
import DailyDealModal from '../../Widgets/ModalWindow';
import PopupNavMenu from './PopupNavMenu/index';
import { useModalWindow } from '../../../redux/actions/modalWindow';
import Like from '../../UI/Like/index';

export default function Header() {
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const isLight = useSelector(state => state.theme.isLight);
	const isModalOpen = useSelector(state => state.modalWindow.isOpen);
	const product = useSelector(state => state.modalWindow.product);
	const navigate = useNavigate();
	const { openModalWithRandomProduct, closeModal } = useModalWindow();

	const handlePopupMenu = () => {
		setIsPopupOpen(!isPopupOpen);
	};

	const handleBasketClick = () => {
		navigate('/shopping_cart', { state: { from: 'Header' } });
	};
	const handleLikeClick = () => {
		navigate('/liked_products', { state: { from: 'Header' } });
	};

	return (
		<header className={`${s.container} ${s.content_line}`}>
			<div className={s.header_left}>
				<Link to='/'>
					<img src={logo} alt='logo' className={s.logo} />
				</Link>
				<ThemeButton className={s.theme_button} />
			</div>

			<div className={s.header_center}>
				<Link to='#' onClick={openModalWithRandomProduct}>
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
				<Like
					onClick={handleLikeClick}
					showCount={true}
					darkTheme={!isLight}
					className={s.like_icon}
				/>
				<Basket
					onClick={handleBasketClick}
					showCount={true}
					darkTheme={!isLight}
					className={s.basket_icon}
				/>

				<RxHamburgerMenu className={s.burger} onClick={handlePopupMenu} />
				<PopupNavMenu
					isPopupOpen={isPopupOpen}
					handlePopupMenu={handlePopupMenu}
					openModal={openModalWithRandomProduct}
				/>
			</div>

			<DailyDealModal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				product={product}
				type={'deal'}
			/>
		</header>
	);
}
