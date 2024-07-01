import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { openModalAction } from '../store/modalWindowReducer';
import { getAllProducts } from '../asyncActions/products';

export default function useRandomProduct() {
	const dispatch = useDispatch();
	const products = useSelector(state => state.products.allProducts);

	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

	const getRandomProduct = () => {
		const randomProduct = products[Math.floor(Math.random() * products.length)];
		return randomProduct;
	};

	const openModalWithRandomProduct = () => {
		const randomProduct = getRandomProduct();
		dispatch(openModalAction(randomProduct));
	};

	return {
		getRandomProduct,
		openModalWithRandomProduct,
	};
}
