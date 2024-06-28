const defaultState = {
	allProducts: [],
	productsFromCategory: {},
	product: { count: 1, isFavorite: false },
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

const SET_FILTERS = 'SET_FILTERS';
const FILTER_PRODUCTS = 'FILTER_PRODUCTS';

export const productsReducer = (state = defaultState, action) => {
	switch (action.type) {
		case GET_ALL_PRODUCTS:
			return {
				...state,
				allProducts: action.payload,
				filteredProducts: action.payload,
			};

		case ADD_PRODUCT_FAVORITE:
			const updatedProducts = state.allProducts.map(product =>
				product.id === action.payload.id
					? { ...product, isFavorite: true }
					: product
			);

			// Сохраняем обновленный список товаров в LocalStorage
			localStorage.setItem('favoriteProducts', JSON.stringify(updatedProducts));

			return {
				...state,
				allProducts: updatedProducts,
			};

	

		case REMOVE_PRODUCT_FAVORITE:
			const removedProducts = state.allProducts.map(product =>
				product.id === action.payload.id
					? { ...product, isFavorite: false }
					: product
			);
			localStorage.setItem('favoriteProducts', JSON.stringify(removedProducts));
			return {
				...state,
				allProducts: removedProducts,
			};

		// return {
		// 	...state,
		// 	allProducts: state.allProducts.map(product =>
		// 		product.id === action.payload.id
		// 			? { ...product, isFavorite: false }
		// 			: product
		// 	),
		// };

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
		case SET_FILTERS:
			return {
				...state,
				filters: {
					...state.filters,
					...action.payload,
				},
			};
		case FILTER_PRODUCTS:
			let filtered = state.allProducts.slice();

			const { minPrice, maxPrice, isDiscounted, sortOrder } = state.filters;

			if (minPrice) {
				filtered = filtered.filter(product =>
					product.discont_price
						? product.discont_price >= minPrice
						: product.price >= minPrice
				);
			}

			if (maxPrice) {
				filtered = filtered.filter(product =>
					product.discont_price
						? product.discont_price <= maxPrice
						: product.price <= maxPrice
				);
			}

			if (isDiscounted) {
				filtered = filtered.filter(product => product.discont_price !== null);
			}

			if (sortOrder === 'priceAsc') {
				filtered = filtered.sort((a, b) => {
					const priceA = a.discont_price !== null ? a.discont_price : a.price;
					const priceB = b.discont_price !== null ? b.discont_price : b.price;
					return priceA - priceB;
				});
			} else if (sortOrder === 'priceDesc') {
				filtered = filtered.sort((a, b) => {
					const priceA = a.discont_price !== null ? a.discont_price : a.price;
					const priceB = b.discont_price !== null ? b.discont_price : b.price;
					return priceB - priceA;
				});
			} else if (sortOrder === 'alphabetical') {
				filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
			}
			return {
				...state,
				filteredProducts: filtered,
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
	type: ADD_PRODUCT_FAVORITE,
	payload: product,
});

export const removeProductFavoriteAction = id => ({
	type: REMOVE_PRODUCT_FAVORITE,
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

export const setFiltersAction = filters => ({
	type: SET_FILTERS,
	payload: filters,
});

export const filterProductsAction = filteredProducts => ({
	type: FILTER_PRODUCTS,
	payload: filteredProducts,
});
