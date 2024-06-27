const defaultState = {
	allProducts: [],
	productsFromCategory: {},
	discountProducts: [],
	product: { count: 1, isFavorite: false },
};

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
const GET_PRODUCTS_BY_CATEGORY_ID = 'GET_PRODUCTS_BY_CATEGORY_ID';
const INCR_PRODUCT_COUNT = 'INCR_PRODUCT_COUNT';
const DECR_PRODUCT_COUNT = 'DECR_PRODUCT_COUNT';
const ADD_PRODUCT_FAVORITE = 'ADD_PRODUCT_FAVORITE';
const REMOVE_PRODUCT_FAVORITE = 'REMOVE_PRODUCT_FAVORITE';

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


		
  case ADD_PRODUCT_FAVORITE:
	
  return {
    ...state,
    allProducts: state.allProducts.map(product =>
        product.id === action.payload.id
            ? { ...product, isFavorite: true }
            : product
    ),
};
			 
		
			/*case ADD_PRODUCT_FAVORITE:
				if (state.favoriteProducts.find(product => product.id === action.payload.id)) {
					return state;
				} else {
					return {
						...state,
						favoriteProducts: [...state.favoriteProducts, action.payload],
					};
				}
	
			case REMOVE_PRODUCT_FAVORITE:
				return {
					...state,
					favoriteProducts: state.favoriteProducts.filter(
						product => product.id !== action.payload.id
					),
				};

			*/
			// case ADD_PRODUCT_FAVORITE:
			// 	if (state.favoriteProducts.includes(action.payload)) { return state; }
			// 	 else {
			// 		return { ...state, favoriteProducts: [...state.favoriteProducts, action.payload], }; }

			case REMOVE_PRODUCT_FAVORITE: 
			return {
				...state,
				favoriteProducts: state.favoriteProducts.filter(
					product => product.id !== action.payload.id
				)
			};
			
			
			
			
			
			
		case GET_PRODUCT_BY_ID:
			return {
				...state,
				product: { ...action.payload[0], count: 1 },
			};
		case GET_PRODUCTS_BY_CATEGORY_ID:
			return {
				...state,
				productsFromCategory: action.payload,
			};
		case INCR_PRODUCT_COUNT:
			return {
				...state,
				product: {
					...state.product,
					count: state.product.count + 1,
				},
			};
		case DECR_PRODUCT_COUNT:
			return {
				...state,
				product: {
					...state.product,
					count: state.product.count > 1 ? state.product.count - 1 : 1,
				},
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

export const addProductFavoriteAction = product => ({
	type:ADD_PRODUCT_FAVORITE,
	payload: product,
});

export const removeProductFavoriteAction = id => ({
	type:REMOVE_PRODUCT_FAVORITE,
	payload: id,
});



export const getProductsByCategoryIdAction = products => ({
	type: GET_PRODUCTS_BY_CATEGORY_ID,
	payload: products,
});
export const incrementProductCountAction = () => ({
	type: INCR_PRODUCT_COUNT,
});

export const decrementProductCountAction = () => ({
	type: DECR_PRODUCT_COUNT,
});
