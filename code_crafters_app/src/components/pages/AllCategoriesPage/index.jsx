import Categories from '../../Common/Categories/index';
import s from './AllCategoriesPage.module.css';
import { NavLink } from 'react-router-dom';

export default function AllCategoriesPage() {
	return (
		<div className={`${s.sale_container} ${s.content_line}`}>
			<div className={s.nav_buttons}>
				<NavLink to='/'>
					<button className={s.mainPageButton}>Main page</button>
				</NavLink>
				<div className={s.line}></div>

				<button className={s.categoriesPageButton}>Categories</button>
			</div>
			<Categories limit={10} style={s} />
		</div>
	);
}
