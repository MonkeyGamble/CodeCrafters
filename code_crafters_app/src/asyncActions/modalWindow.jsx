import { openModalAction, closeModalAction } from '../store/modalWindowReducer';
import { setCurrentProductAction } from '../store/productsReducer';

export const openModal = (
	dispatch,
	allProducts,
	setProduct,
	setIsModalOpen
) => {
	if (allProducts.length > 0) {
		const randomProduct =
			allProducts[Math.floor(Math.random() * allProducts.length)];
		setProduct(randomProduct);
		setIsModalOpen(true);
		dispatch(openModalAction());
	}
};

export const closeModal = (dispatch, setIsModalOpen) => {
	setIsModalOpen(false);
	dispatch(closeModalAction());
};

export const handleAddToCart = (dispatch, product, setIsModalOpen) => {
	const productToAdd = {
		...product,
		count: 1,
	};
	dispatch(setCurrentProductAction(productToAdd));
	setIsModalOpen(false); // Close modal after adding to cart
	dispatch(closeModalAction());
};
