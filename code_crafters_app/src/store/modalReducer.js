const defaultState = { isModalOpen: false };

const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

export const modalReducer = (state = defaultState, action) => {
	switch (action.type) {
		case OPEN_MODAL:
			return { ...state, isModalOpen: true };

		case CLOSE_MODAL:
			return { ...state, isModalOpen: false };

		default:
			return state;
	}
};

export const openModalAction = () => ({ type: OPEN_MODAL });
export const closeModalAction = () => ({ type: CLOSE_MODAL });
