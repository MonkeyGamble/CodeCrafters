const defaultState = {
	allCategories: [],
};

const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';


export const categoriesReducer = (state = defaultState, action) => {
	switch (action.type) {
		case GET_ALL_CATEGORIES:
			return { ...state, allCategories: action.payload };
		default:
			return state;
	}
};

export const getAllCategoriesAction = categories => ({
	type: GET_ALL_CATEGORIES,
	payload: categories,
});
