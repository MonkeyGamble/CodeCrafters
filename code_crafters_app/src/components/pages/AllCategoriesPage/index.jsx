import Categories from '../../Common/Categories/index';
import BreadCrumbs from '../../UI/BreadCrumbs';
import s from './AllCategoriesPage.module.css';
import '../../../styles/Global.css';

export default function AllCategoriesPage() {
	return (
		<div className={`${s.categories_container} content_line`}>
			<BreadCrumbs sectionName={'Categories'} />
			<Categories limit={1000} style={s} />
		</div>
	);
}
