import { filterProducts } from '../components/Filter/filterUtils';


const defaultState = {
	allProducts: [],
	productsFromCategory: {},
	discountProducts: [],
	currentProduct: null, // Добавлено поле currentProduct
	product: { count: 1 },
	favoriteProducts: [],
	favoriteProductsCount: 0, // Добавлено поле кол-ва продуктов в Избранных
	filteredProducts: [],
	filters: {
	  minPrice: '',
	  maxPrice: '',
	  isDiscounted: false,
	  sortOrder: 'default',},
	loading: false, // Добавлено состояние загрузки
  };
  
  const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
  const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
  const GET_PRODUCTS_BY_CATEGORY_ID = 'GET_PRODUCTS_BY_CATEGORY_ID';
  const INCR_PRODUCT_COUNT = 'INCR_PRODUCT_COUNT';
  const DECR_PRODUCT_COUNT = 'DECR_PRODUCT_COUNT';
  const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT';
const SET_FILTERS = 'SET_FILTERS';
const FILTER_PRODUCTS = 'FILTER_PRODUCTS';
const START_LOADING = 'START_LOADING';
const STOP_LOADING = 'STOP_LOADING';
  
export const productsReducer = (state = defaultState, action) => {
	console.log('productsReducer state:', state, 'action:', action);
	switch (action.type) {
		case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
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
		  discountProducts: filtered,
		};
	  default:
		return state;
	}
  };



