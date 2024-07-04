import { Link, useParams } from 'react-router-dom';
import s from './BreadCrumbs.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../../redux/actions/products';
import { getAllCategories } from '../../../redux/actions/categories';

export default function BreadCrumbs({ product, sectionName, categoryName }) {
	const dispatch = useDispatch();
	const categories = useSelector(state => state.categories.allCategories);
	const { id } = useParams();

	useEffect(() => {
		dispatch(getProductById(id));
		dispatch(getAllCategories());
	}, [dispatch, id]);

	return (
		<div className={s.nav_buttons}>
			<Link to='/'>
				<button className={s.to_homepage}>Main page</button>
			</Link>
			<div className={s.nav_line}></div>
			<Link to='/all_categories'>
				<button className={s.section_button}>{sectionName}</button>
			</Link>
			<div className={s.nav_line}></div>
			<Link
				to={`/categories/${
					categories.find(category => category.id === product.categoryId)?.id
				}`}
			>
				<button className={s.category_name_button}>{categoryName}</button>
			</Link>
			<div className={s.nav_line}></div>
			<button className={s.product_name_button}>{product.title}</button>
		</div>
	);
}
