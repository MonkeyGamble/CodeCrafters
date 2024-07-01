import { RxCross2 } from 'react-icons/rx';
import style from './PopupNavMenu.module.css';

export default function PopupNavMenu() {
	return (
		<nav className={style.modal_menu}>
			<ul>
				<li>Main Page</li>
				<li>Categories</li>
				<li>All Products</li>
				<li>All Sales</li>
			</ul>
		</nav>
	);
}
