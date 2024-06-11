import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../../asyncActions/products';
import { ROOT_URL } from '../../..';

export default function ProductItemPage() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const product = useSelector(state => state.products.product);

	useEffect(() => {
		dispatch(getProductById(id)).then(() => setLoading(false));
	}, [dispatch, id]);

	if (loading) {
		return <p>Loading...</p>;
	}
	console.log(product);
	console.log(product.title);

	return (
		<div>
			<h1>{product.title}</h1>
			<img src={`${ROOT_URL}${product.image}`} alt={product.title} />
			<p>{product.description}</p>
			<div>
				<h2>${product.discont_price}</h2>
				<h5>${product.price}</h5>
			</div>
		</div>
	);
}
