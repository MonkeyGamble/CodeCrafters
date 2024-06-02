const defaultState = {
	allProducts: [],
	discountProducts: [],
};

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const GET_DISCOUNT_PRODUCTS = 'GET_DISCOUNT_PRODUCTS';

export const productsReducer = (state = defaultState, action) => {
	switch (action.type) {
		case GET_ALL_PRODUCTS:
			return { ...state, allProducts: action.payload };
		case GET_DISCOUNT_PRODUCTS:
			return { ...state, discountProducts: action.payload };
		default:
			return state;
	}
};

export const getAllProductsAction = products => ({
	type: GET_ALL_PRODUCTS,
	payload: products,
});

export const getDiscountProductsAction = products => ({
	type: GET_DISCOUNT_PRODUCTS,
	payload: products,
});
