import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './Header.module.css';
import ThemeButton from './ThemeButton/index';
import logo from '../../assets/img/logo.png';
import like from '../../assets/img/like.png';
import like_darkTheme from '../../assets/img/like_darkTheme.png';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import Basket from '../Basket/index';
import DailyDealModal from '../ModalWindow/DailyDealModal';
import PopupNavMenu from './PopupNavMenu';
import {
	openModalAction,
	closeModalAction,
} from '../../store/modalWindowReducer';
import { getAllProducts } from '../../asyncActions/products';

export default function Header() {
	const dispatch = useDispatch();
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const isLight = useSelector(state => state.theme.isLight);
	const isModalOpen = useSelector(state => state.modalWindow.isOpen);
	const product = useSelector(state => state.modalWindow.product);
	const products = useSelector(state => state.products.allProducts);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

	const openModal = e => {
		e.preventDefault();
		const randomProduct = products[Math.floor(Math.random() * products.length)];
		dispatch(openModalAction(randomProduct)); // Диспатчим действие для открытия модального окна
	};

	const closeModal = () => {
		dispatch(closeModalAction()); // Диспатчим действие для закрытия модального окна
	};

	const handlePopupMenu = () => {
		setIsPopupOpen(!isPopupOpen);
	};

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
				<Link to='#' onClick={openModal}>
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
					<img src={isLight ? like : like_darkTheme} alt='like' />
				</NavLink>
				<NavLink to='/shopping_cart' className={s.shopping_cart}>
					<Basket onClick={handleBasketClick} />
				</NavLink>

				<PopupNavMenu
					isPopupOpen={isPopupOpen}
					handlePopupMenu={handlePopupMenu}
					openModal={openModal}
				/>
				<RxHamburgerMenu className={s.burger} onClick={handlePopupMenu} />
			</div>

			<DailyDealModal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				product={product}
			/>
		</header>
	);
}
