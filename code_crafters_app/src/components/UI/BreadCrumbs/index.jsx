import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../../redux/actions/products';
import { getAllCategories } from '../../../redux/actions/categories';
import s from './breadCrumbs.module.css';

export default function BreadCrumbs({ product, sectionName, categoryName }) {
	const dispatch = useDispatch();
	const categories = useSelector(state => state.categories.allCategories);
	const { id } = useParams();

	useEffect(() => {
		if (id) {
			dispatch(getProductById(id));
		}
		dispatch(getAllCategories());
	}, [dispatch, id]);

	const category = categories.find(
		category => category.id === product?.categoryId
	);

	return (
		<section className={s.nav_buttons}>
			<Link to='/'>
				<button className={s.to_homepage}>Main page</button>
			</Link>
			<div className={s.nav_line}></div>
			<Link to='/all_categories'>
				<button
					className={`${s.section_button} ${
						!categoryName ? s.text_black : s.text_grey
					}`}
				>
					{sectionName}
				</button>
			</Link>
			{categoryName && (
				<>
					<div className={s.nav_line}></div>
					<Link to={`/categories/${category?.id}`}>
						<button
							className={`${s.category_name_button} ${
								!product ? s.text_black : s.text_grey
							}`}
						>
							{categoryName}
						</button>
					</Link>
					{product && (
						<>
							<div className={s.nav_line}></div>
							<button className={s.product_name_button}>{product.title}</button>
						</>
					)}
				</>
			)}
		</section>
	);
}
