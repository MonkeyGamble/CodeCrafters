import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DiscountProducts from '../../DiscountProducts';
import { getAllProducts } from '../../../asyncActions/products';
import s from './DiscountedItemsPage.module.css';

export default function DiscountItemsPage() {
	const dispatch = useDispatch();

	const discountProducts = useSelector(
		state => state.products.discountProducts
	);

	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

	return (
		<div>
			<DiscountProducts
				products={discountProducts}
				header='Discounted Items'
				styles={s}
			/>
		</div>
	);
}
