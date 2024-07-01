const initialState = {
	isOpen: false,
	product: null,
};

const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

export const modalWindowReducer = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_MODAL:
			return {
				...state,
				isOpen: true,
				product: action.payload,
			};
		case CLOSE_MODAL:
			return {
				...state,
				isOpen: false,
				product: null,
			};
		default:
			return state;
	}
};

export const openModalAction = product => ({
	type: OPEN_MODAL,
	payload: product,
});

export const closeModalAction = () => ({
	type: CLOSE_MODAL,
});
