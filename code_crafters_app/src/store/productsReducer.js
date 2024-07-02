import { filterProducts } from '../components/Filter/filterUtils';
const defaultState = {
	allProducts: [],
	productsFromCategory: {},
	discountProducts: [],
	product: { count: 1 },
	favoriteProducts: [],
	currentProduct: null, // Добавлено поле currentProduct
	filteredProducts: [],
	filters: {
		minPrice: '',
		maxPrice: '',
		isDiscounted: false,
		sortOrder: 'default',
	},
};

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
const GET_PRODUCTS_BY_CATEGORY_ID = 'GET_PRODUCTS_BY_CATEGORY_ID';
const INCR_PRODUCT_COUNT = 'INCR_PRODUCT_COUNT';
const DECR_PRODUCT_COUNT = 'DECR_PRODUCT_COUNT';
const ADD_PRODUCT_FAVORITE = 'ADD_PRODUCT_FAVORITE';
const REMOVE_PRODUCT_FAVORITE = 'REMOVE_PRODUCT_FAVORITE';
const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT';
const SET_FILTERS = 'SET_FILTERS';
const FILTER_PRODUCTS = 'FILTER_PRODUCTS';
// const SET_FAVORITE_PRODUCTS_FROM_LOCAL_STORAGE =
// 'SET_FAVORITE_PRODUCTS_FROM_LOCAL_STORAGE';

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
			const productToAdd = { ...action.payload, isFavorite: true };
			if (
				state.favoriteProducts.some(product => product.id === productToAdd.id)
			) {
				console.log('Product already in favorites, skipping addition');
				return state; // Товар уже есть в избранных, ничего не меняем
			}
			console.log('Adding to favorites:', productToAdd);
			return {
				...state,
				favoriteProducts: [...state.favoriteProducts, productToAdd],
				allProducts: state.allProducts.map(product =>
					product.id === action.payload.id
						? { ...product, isFavorite: true }
						: product
				),
			};

		case REMOVE_PRODUCT_FAVORITE:
			console.log('Removing from favorites:', action.payload.id);
			const updatedFavoriteProducts = state.favoriteProducts.filter(
				product => product.id !== action.payload.id
			);
			return {
				...state,
				favoriteProducts: updatedFavoriteProducts,
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
		case SET_CURRENT_PRODUCT:
			return {
				...state,
				currentProduct: action.payload,
			};
		case SET_FILTERS:
			return {
				...state,
				filters: {
					...state.filters,
					...action.payload,
				},
			};
		case FILTER_PRODUCTS:
			const filteredProducts = filterProducts(state.allProducts, state.filters);
			const discountFilteredProducts = filteredProducts.filter(
				product => product.discont_price !== null
			);
			const filteredFavoriteProducts = filteredProducts.filter(
				product => product.isFavorite
			);

			return {
				...state,
				filteredProducts: filteredProducts,
				discountProducts: discountFilteredProducts,
			};
		// case SET_FAVORITE_PRODUCTS_FROM_LOCAL_STORAGE:
		// 	return {
		// 		...state,
		// 		favoriteProducts: action.payload,
		// 	};
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

export const addProductFavoriteAction = product => {
	return (dispatch, getState) => {
		dispatch({
			type: ADD_PRODUCT_FAVORITE,
			payload: product,
		});

		// Сохранение в localStorage
		// const { favoriteProducts } = getState().products;
		// localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
	};
};

export const removeProductFavoriteAction = productId => {
	return (dispatch, getState) => {
		dispatch({
			type: REMOVE_PRODUCT_FAVORITE,
			payload: { id: productId },
		});

		// Сохранение в localStorage
		// const { favoriteProducts } = getState().products;
		// localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
	};
};

// export const setFavoriteProductsFromLocalStorageAction = favoriteProducts => ({
// 	type: SET_FAVORITE_PRODUCTS_FROM_LOCAL_STORAGE,
// 	payload: favoriteProducts,
// });

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

export const setCurrentProductAction = product => ({
	type: SET_CURRENT_PRODUCT,
	payload: product,
});

export const setFiltersAction = filters => ({
	type: SET_FILTERS,
	payload: filters,
});

export const filterProductsAction = filteredProducts => ({
	type: FILTER_PRODUCTS,
	payload: filteredProducts,
});
