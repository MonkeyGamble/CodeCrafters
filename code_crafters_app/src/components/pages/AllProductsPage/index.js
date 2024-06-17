import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './AllProductsPage.module.css';
import { Link } from 'react-router-dom';
import ProductCard from '../../ProductCard';
import Filter from '../../Filter';

const ROOT_URL = 'http://localhost:3333';

const AllProductsPage = () => {
	const [products, setProducts] = useState([]);
	const [randomAllProducts, setFilteredProducts] = useState([]);
	const [minPrice, setMinPrice] = useState('');
	const [maxPrice, setMaxPrice] = useState('');
	const [isDiscounted, setIsDiscounted] = useState(false);
	const [sortOrder, setSortOrder] = useState('default');

	useEffect(() => {
		axios
			.get(`${ROOT_URL}/products/all`)
			.then(response => {
				console.log('Products:', response.data);
				setProducts(response.data);
				setFilteredProducts(response.data);
			})
			.catch(error => {
				console.error('There was an error fetching the products!', error);
			});
	}, []);

	useEffect(() => {
		let filtered = products;
		if (minPrice !== '')
			filtered = filtered.filter(p => p.discont_price >= parseFloat(minPrice));
		if (maxPrice !== '')
			filtered = filtered.filter(p => p.discont_price <= parseFloat(maxPrice));
		if (isDiscounted)
			filtered = filtered.filter(p => p.discont_price < p.price);

		switch (sortOrder) {
			case 'priceAsc':
				filtered = filtered.sort((a, b) => a.discont_price - b.discont_price);
				break;
			case 'priceDesc':
				filtered = filtered.sort((a, b) => b.discont_price - a.discont_price);
				break;
			case 'alphabetical':
				filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
				break;
			default:
				break;
		}

		setFilteredProducts([...filtered]);
	}, [minPrice, maxPrice, isDiscounted, sortOrder, products]);

	return (
		<div className={`${style.sale_container} content_line`}>
			<div className={style.nav_buttons}>
				<Link to='/'>
					<button className={style.first_button}>Main page</button>
				</Link>
				<div className={style.nav_line}></div>
				<Link to='/all_sales'>
					<button className={style.second_button}>All products</button>
				</Link>
			</div>

			<div className={style.header_section}>
				<h1>All Products</h1>
			</div>

			<Filter />

			<div className={style.cards_container}>
				{randomAllProducts.map(product => (
					<ProductCard key={products.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default AllProductsPage;

