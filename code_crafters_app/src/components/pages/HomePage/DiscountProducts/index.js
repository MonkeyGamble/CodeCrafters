import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../../../Global.css';
import { getAllProducts } from '../../../../asyncActions/products';
import { shuffle } from '../../../../utils/shuffleArray';
import DiscountProducts from '../../../DiscountProducts/index';
import s from './DiscountProducts.module.css';

export default function DiscountProductsHomePage() {
	const dispatch = useDispatch();
	const allProducts = useSelector(state => state.products.allProducts);
	const discountProducts = allProducts.filter(
		product => product.discont_price !== null
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
