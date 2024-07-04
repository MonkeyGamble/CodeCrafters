import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../../../styles/Global.css';
import { getAllProducts } from '../../../../redux/actions/products';
import { shuffle } from '../../../../utils/shuffleArray';
import DiscountProducts from '../../../Common/DiscountProducts/index';
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
