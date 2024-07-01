
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../../ProductCard';
import s from './FavoriteProductsPage.module.css';
import { Link } from 'react-router-dom';
import Filter from '../../Filter';


export default function FavoriteProductsPage() {
	const dispatch = useDispatch();

	const favoriteProducts= useSelector
		(state => state.products.favoriteProducts);

	return (
		<div className={`${s.discount_wrapper} content_line`}>
			<div className={s.nav_buttons}>
				<Link to='/'>
					<button className={s.first_button}>Main page</button>
				</Link>
				<div className={s.nav_line}></div>
				<Link to='/favorite_products '>
					<button className={s.second_button}>Favorite products </button>
				</Link>
			</div>
                 <h1>Favorite products</h1>
			<div className={s.productsList}>
			{favoriteProducts.map(product => (
        <ProductCard 
		key={product.id} 
		product={product} 
		header='Favorite products'
		filter={<Filter />}
		/*styles={s}
		*/
		/>
    ))}

         </div>
				
</div>			
    );
}











