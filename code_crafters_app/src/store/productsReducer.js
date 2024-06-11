const defaultState = {
	allProducts: [],
	productsFromCategory: {},
	discountProducts: [],
	product: {},
};

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
const GET_PRODUCTS_BY_CATEGORY_ID = 'GET_PRODUCTS_BY_CATEGORY_ID';

export const productsReducer = (state = defaultState, action) => {
	switch (action.type) {
		case GET_ALL_PRODUCTS:
			const discountProducts = action.payload.filter(
				product => product.discont_price !== null
			);
			return {
				...state,
				allProducts: action.payload,
				discountProducts: discountProducts,
			};
		case GET_PRODUCT_BY_ID:
			return {
				...state,
				product: action.payload[0],
			};
		case GET_PRODUCTS_BY_CATEGORY_ID:
			return {
				...state,
				productsFromCategory: action.payload,
			};
		default:
			return state;
	}
};

export const getAllProductsAction = products => ({
	type: GET_ALL_PRODUCTS,
	payload: products,
});

export const getProductByIdAction = product => ({
	type: GET_PRODUCT_BY_ID,
	payload: product,
});

export const getProductsByCategoryIdAction = products => ({
	type: GET_PRODUCTS_BY_CATEGORY_ID,
	payload: products,
});
