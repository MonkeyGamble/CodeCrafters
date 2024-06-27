import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../../../asyncActions/products';
import s from './FavoriteProductsPage.module.css';
import { Link } from 'react-router-dom';
// import Filter from '../../Filter';
import ProductCard from '../../ProductCard';

export default function FavoriteProductsPage() {
	const dispatch = useDispatch();

	const favoriteProducts= useSelector
		(state => state.products.allProducts);



	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

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

			<div className={s.productsList}>
			{favoriteProducts.filter(product => product.isFavorite === true).map(product => (
        <ProductCard key={product.id} product={product} />
    ))}


				{/* { favoriteProducts.length > 0 ? (
					favoriteProducts.map(product => (
						<ProductCard key={product.id} product={product} />
					))


					
				) : (
					<p>No favorite products found.</p>
				)} */}
			</div>

		</div>
	);
}



/*







import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../../../asyncActions/products';
import s from './FavoriteProductsPage.module.css';
import { Link } from 'react-router-dom';
import Filter from '../../Filter';
import ProductCard from '../../ProductCard';

export default function FavoriteProductsPage() {
	const dispatch = useDispatch();

	const productCard = useSelector
		(state => state.products.favoriteProducts);
console.log(favoriteProducts);
	

	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

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

			<div className={s.productsList}>
				{favoriteProducts && favoriteProducts.length > 0 ? (
					favoriteProducts.map(product => (
						<ProductCard key={product.id} product={product} />
					))
				) : (
					<p>No favorite products found.</p>
				)}
			</div>

		</div>
	);
}



*/



/*



<ProductCard
				products={productCard}
				header='Favorite products'
				styles={s}
				filter={<Filter />}
			/>




*/


/*



import s from './FavoriteProductsPage.module.css';
import { useSelector } from 'react-redux';
import FavoriteProductsPage from './index';



export default function FavoriteProductsPage() {

const favoriteProducts = useSelector (state => state.products.favoriteProducts);
console.log(favoriteProducts);

	return <div>FavoriteProductsPage</div>;
}


*/
