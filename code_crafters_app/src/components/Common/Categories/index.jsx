import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ROOT_URL } from '../../../index.js';
import { getAllCategories } from '../../../redux/actions/categories.jsx';
import { Link, NavLink } from 'react-router-dom';
import '../../../styles/Global.css';

export default function Categories({ limit, style }) {
	const dispatch = useDispatch();
	const categories = useSelector(state => state.categories.allCategories);

	useEffect(() => {
		dispatch(getAllCategories());
	}, [dispatch]);

	return (
		<section className={style.categories}>
			<div className={`${style.wrapper} .content_line`}>
				<div className={style.header}>
					<h2>Categories</h2>
				</div>

				<div className={style.category_list}>
					{categories.slice(0, limit).map(category => (
						<Link
							key={category.id}
							to={`/categories/${category.id}`}
							className={style.category_item}
						>
							<img
								src={ROOT_URL + category.image}
								alt={category.title}
								className={style.category_image}
							/>
							<p>{category.title}</p>
						</Link>
					))}
				</div>
			</div>
			<NavLink to='/all_categories'>
				<button className={style.my_button_bottom}>All categories</button>
			</NavLink>
		</section>
	);
}
