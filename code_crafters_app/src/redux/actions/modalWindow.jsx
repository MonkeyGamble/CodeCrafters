import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
	openModalAction,
	closeModalAction,
} from '../reducers/modalWindowReducer';
import { getAllProducts } from './products';

export function useModalWindow() {
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

	const closeModal = () => {
		dispatch(closeModalAction());
	};

	return {
		getRandomProduct,
		openModalWithRandomProduct,
		closeModal,
	};
}
