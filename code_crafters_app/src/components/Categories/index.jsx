import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ROOT_URL } from '../../index';
import { getAllCategories } from '../../asyncActions/categories';
import { Link, NavLink } from 'react-router-dom';
import '../../Global.css';

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
					<span className={style.line}></span>
					<NavLink to='/all_categories'>
						<button className={style.my_button}>All categories</button>
					</NavLink>
				</div>

				<div className={style.categoryList}>
					{categories.slice(0, limit).map(category => (
						<Link
							key={category.id}
							to={`/categories/${category.id}`}
							className={style.categoryItem}
						>
							<div key={category.id} className={style.categoryItem}>
								<img
									src={ROOT_URL + category.image}
									alt={category.title}
									className={style.categoryImage}
								/>
								<p>{category.title}</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
