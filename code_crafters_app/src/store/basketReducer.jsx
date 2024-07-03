const defaultState = {
	basket: {
		items: [],
		totalPrice: 0,
		itemsCount: 0, // Добавляем новое свойство для количества товаров в корзине
	},
};

const ADD_PRODUCT_TO_BASKET = 'ADD_PRODUCT_TO_BASKET';
const REMOVE_PRODUCT_FROM_BASKET = 'REMOVE_PRODUCT_FROM_BASKET';
const CLEAR_BASKET = 'CLEAR_BASKET';
const INCR_PRODUCT_COUNT = 'INCR_PRODUCT_COUNT';
const DECR_PRODUCT_COUNT = 'DECR_PRODUCT_COUNT';

export const basketReducer = (state = defaultState, action) => {
	switch (action.type) {
		case ADD_PRODUCT_TO_BASKET: {
			const productToAdd = action.payload;

			const existingProductIndex = state.basket.items.findIndex(
				item => item.id === productToAdd.id
			);

			const totalPriceToAdd =
				(productToAdd.discont_price || productToAdd.price) * productToAdd.count;

			if (existingProductIndex !== -1) {
				const updatedItems = state.basket.items.map((item, index) =>
					index === existingProductIndex
						? { ...item, count: item.count + productToAdd.count }
						: item
				);

				const updatedTotalPrice = state.basket.totalPrice + totalPriceToAdd;
				const updatedItemsCount = updatedItems.reduce(
					(count, item) => count + item.count,
					0
				);

				return {
					...state,
					basket: {
						...state.basket,
						items: updatedItems,
						totalPrice: updatedTotalPrice,
						itemsCount: updatedItemsCount,
					},
				};
			} else {
				const updatedItems = [...state.basket.items, { ...productToAdd }];
				const updatedTotalPrice = state.basket.totalPrice + totalPriceToAdd;
				const updatedItemsCount = updatedItems.reduce(
					(count, item) => count + item.count,
					0
				);

				return {
					...state,
					basket: {
						...state.basket,
						items: updatedItems,
						totalPrice: updatedTotalPrice,
						itemsCount: updatedItemsCount,
					},
				};
			}
		}
		case REMOVE_PRODUCT_FROM_BASKET: {
			const productId = action.payload;
			const productToRemove = state.basket.items.find(
				item => item.id === productId
			);

			if (!productToRemove) return state;

			const updatedItems = state.basket.items.filter(
				item => item.id !== productId
			);
			const updatedTotalPrice =
				state.basket.totalPrice -
				(productToRemove.discont_price || productToRemove.price) *
					productToRemove.count;
			const updatedItemsCount = updatedItems.reduce(
				(count, item) => count + item.count,
				0
			);

			return {
				...state,
				basket: {
					...state.basket,
					items: updatedItems,
					totalPrice: updatedTotalPrice,
					itemsCount: updatedItemsCount,
				},
			};
		}
		case CLEAR_BASKET:
			return {
				...state,
				basket: {
					items: [],
					totalPrice: 0,
				},
			};
		case INCR_PRODUCT_COUNT: {
			const product = state.basket.items.find(
				item => item.id === action.payload
			);
			if (!product) return state;

			const updatedItems = state.basket.items.map(item =>
				item.id === action.payload ? { ...item, count: item.count + 1 } : item
			);
			const updatedTotalPrice =
				state.basket.totalPrice + (product.discont_price || product.price);
			const updatedItemsCount = updatedItems.reduce(
				(count, item) => count + item.count,
				0
			);

			return {
				...state,
				basket: {
					...state.basket,
					items: updatedItems,
					totalPrice: updatedTotalPrice,
					itemsCount: updatedItemsCount,
				},
			};
		}
		case DECR_PRODUCT_COUNT: {
			const product = state.basket.items.find(
				item => item.id === action.payload
			);
			if (!product) return state;

			const updatedItems = state.basket.items.map(item =>
				item.id === action.payload
					? { ...item, count: item.count > 1 ? item.count - 1 : 1 }
					: item
			);
			const updatedTotalPrice =
				state.basket.totalPrice -
				(product.count > 1 ? product.discont_price || product.price : 0);
			const updatedItemsCount = updatedItems.reduce(
				(count, item) => count + item.count,
				0
			);

			return {
				...state,
				basket: {
					...state.basket,
					items: updatedItems,
					totalPrice: updatedTotalPrice,
					itemsCount: updatedItemsCount,
				},
			};
		}
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

export const clearBasketAction = () => ({
	type: CLEAR_BASKET,
});

export const incrementProductCountAction = id => ({
	type: INCR_PRODUCT_COUNT,
	payload: id,
});

export const decrementProductCountAction = id => ({
	type: DECR_PRODUCT_COUNT,
	payload: id,
});
