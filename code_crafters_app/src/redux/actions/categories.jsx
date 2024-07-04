import { getAllCategoriesAction } from '../reducers/categoriesReducer';
import { ROOT_URL } from '../..';

export function getAllCategories() {
	return function (dispatch) {
		fetch(ROOT_URL + 'categories/all')
			.then(res => res.json())
			.then(categories => {
				dispatch(getAllCategoriesAction(categories));
			})
			.catch(error => console.error('Error fetching categories:', error));
	};
}
