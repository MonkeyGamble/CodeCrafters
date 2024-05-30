import { getAllProductsAction } from '../store/productsReducer';

export function getAllProducts() {
	return function (dispatch) {
		fetch('http://localhost:3333/products/all')
			.then(res => res.json())
			.then(products => {
				dispatch(getAllProductsAction(products));
				console.log('All products:', products);
			})
			.catch(error => console.error('Error fetching products:', error));
	};
}
