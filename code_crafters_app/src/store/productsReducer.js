const defaultState = {
	allProducts: [],
};

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';

export const productsReducer = (state = defaultState, action) => {
	switch (action.type) {
		case GET_ALL_PRODUCTS:
			return { ...state, allProducts: action.payload };
		default:
			return state;
	}
};

export const getAllProductsAction = products => ({
	type: GET_ALL_PRODUCTS,
	payload: products,
});
