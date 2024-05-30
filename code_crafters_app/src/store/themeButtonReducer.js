const defaultState = {
	isLight: true,
};

const TOGGLE_THEME = 'TOGGLE_THEME';

const themeReducer = (state = defaultState, action) => {
	switch (action.type) {
		case TOGGLE_THEME:
			return {
				...state,
				isLight: !state.isLight,
			};
		default:
			return state;
	}
};

export const toggleTheme = () => ({
	type: TOGGLE_THEME,
});

export default themeReducer;
