import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../../../Global.css';
import { getAllProducts } from '../../../../asyncActions/products';
import { shuffle } from '../../../../utils/shuffleArray';
import DiscountProducts from '../../../DiscountProducts/index';
import s from './DiscountProducts.module.css';

export default function DiscountProductsHomePage() {
	const dispatch = useDispatch();

	const discountProducts = useSelector(
		state => state.products.discountProducts
	);

	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

	const randomDiscountProducts = shuffle(discountProducts).slice(0, 4);

	return (
		<DiscountProducts
			products={randomDiscountProducts}
			header='Sale'
			styles={s}
		/>
	);
}
