import Categories from '../../Categories/index';
import s from './AllCategoriesPage.module.css';
import { NavLink } from 'react-router-dom';

export default function AllCategoriesPage() {
	return <div className={`${s.sale_container} ${s.content_line}`}>
            <NavLink to="/">
			<button className={s.mainPageButton}>Main page</button>
            </NavLink>
			<span className={s.line}></span>
			<button className={s.mainPageButton}>Categories</button>
            <Categories limit={10} style={s} />
		
	</div>;
}
/* <button>Main page</button>
		
		< Categories/>*/