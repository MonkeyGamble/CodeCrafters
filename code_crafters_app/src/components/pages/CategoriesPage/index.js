import Categories from '../HomePage/Categories';
import s from './CategoriesPage.module.css';
import { NavLink } from 'react-router-dom';

export default function CategoriesPage() {
	return <div className={s.categoriespage}>
            <NavLink to="/">
			<button className={s.mainPageButton}>Main page</button>
            </NavLink>
			<span className={s.line}></span>
			<button className={s.mainPageButton}>Categories</button>
            <Categories limit={5} style={s} />
		
	</div>;
}
/* <button>Main page</button>
		
		< Categories/>*/