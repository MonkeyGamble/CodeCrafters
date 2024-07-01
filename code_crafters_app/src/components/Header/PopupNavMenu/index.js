import React from 'react';
import { Link } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import s from './PopupNavMenu.module.css';

const PopupNavMenu = ({ isPopupOpen, handlePopupMenu, openModal }) => {
	console.log('isPopupOpen: ', isPopupOpen);
	return (
		<div className={`${s.modal_menu} ${isPopupOpen ? s.active : ''}`}>
			<RxCross2
				className={`${s.cross} ${isPopupOpen ? s.active : ''}`}
				onClick={handlePopupMenu}
			/>
			<nav>
				<ul className={`${s.nav_menu} ${isPopupOpen ? s.active : ''}`}>
					<Link to='/'>
						<li>Main Page</li>
					</Link>
					<Link to='/all_categories'>
						<li>Categories</li>
					</Link>
					<Link to='/all_products'>
						<li>All Products</li>
					</Link>
					<Link to='/all_sales'>
						<li>All Sales</li>
					</Link>
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
