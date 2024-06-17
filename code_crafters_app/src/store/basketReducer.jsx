const defaultState = {
	basket: {
		items: [],
		totalPrice: 0,
	},
};

const ADD_PRODUCT_TO_BASKET = 'ADD_PRODUCT_TO_BASKET';
const REMOVE_PRODUCT_FROM_BASKET = 'REMOVE_PRODUCT_FROM_BASKET';
const INCR_PRODUCT_COUNT = 'INCR_PRODUCT_COUNT';
const DECR_PRODUCT_COUNT = 'DECR_PRODUCT_COUNT';

export const basketReducer = (state = defaultState, action) => {
	switch (action.type) {
		case ADD_PRODUCT_TO_BASKET:
			return {
				...state,
				basket: {
					...state.basket,
					items: [...state.basket.items, action.payload],
					totalPrice: state.basket.totalPrice + action.payload.price,
				},
			};
		default:
			return state;
	}
};

export const addProductToBasketAction = product => ({
	type: ADD_PRODUCT_TO_BASKET,
	payload: product,
});

export const removeProductFromBasketAction = id => ({
	type: REMOVE_PRODUCT_FROM_BASKET,
	payload: id,
});
export const incrementProductCountAction = id => ({
	type: INCR_PRODUCT_COUNT,
	payload: id,
});
export const decrementProductCountAction = id => ({
	type: DECR_PRODUCT_COUNT,
	payload: id,
});

// case ADD_PRODUCT_TO_BASKET:
// 			const product = action.payload[0];
// 			const productInBasket = state.basket.find(prod => prod.id === product.id);
// 			if (productInBasket) {
// 				const updatedBasket = state.basket.map(prod =>
// 					prod.id === product.id ? { ...prod, count: prod.count + 1 } : prod
// 				);
// 				return { ...state, basket: updatedBasket };
// 			} else {
// 				return {
// 					...state,
// 					basket: [...state.basket, { ...product, count: 1 }],
// 				};
// 			}
// 		case REMOVE_PRODUCT_FROM_BASKET:
// 			const updatedBasket = state.basket.filter(
// 				prod => prod.id !== action.payload
// 			);
// 			return { ...state, basket: updatedBasket };
// 		case INCR_PRODUCT_COUNT:
// 			const updatedBasketIncr = state.basket.map(prod =>
// 				prod.id === action.payload ? { ...prod, count: prod.count + 1 } : prod
// 			);
// 			return { ...state, basket: updatedBasketIncr };
// 		case DECR_PRODUCT_COUNT:
// 			const updatedBasketDecr = state.basket.map(prod =>
// 				prod.id === action.payload ? { ...prod, count: prod.count - 1 } : prod
// 			);
// 			return { ...state, basket: updatedBasketDecr };
