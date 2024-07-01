import React from 'react';
import { NavLink } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import s from './PopupNavMenu.module.css';

const PopupNavMenu = ({ isPopupOpen, handlePopupMenu, openModal }) => {
	return (
		<div className={`${s.modal_menu} ${isPopupOpen ? s.active : ''}`}>
			<RxCross2
				className={`${s.cross} ${isPopupOpen ? s.active : ''}`}
				onClick={handlePopupMenu}
			/>
			<nav>
				<ul className={`${s.nav_menu} ${isPopupOpen ? s.active : ''}`}>
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
			<div
				className={`${s.discount} ${isPopupOpen ? s.active : ''}`}
				onClick={openModal}
			>
				1 day discount!
			</div>
		</div>
	);
};

export default PopupNavMenu;
