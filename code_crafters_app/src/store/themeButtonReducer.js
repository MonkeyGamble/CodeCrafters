const defaultState = {
	isLight: JSON.parse(localStorage.getItem('isLight')) ?? true, // Получаем состояние из localStorage
};

const TOGGLE_THEME = 'TOGGLE_THEME';

const themeReducer = (state = defaultState, action) => {
	switch (action.type) {
		case TOGGLE_THEME:
			const newThemeState = !state.isLight;
			localStorage.setItem('isLight', JSON.stringify(newThemeState)); // Сохраняем новое состояние в localStorage
			return {
				...state,
				isLight: newThemeState,
			};
		default:
			return state;
	}
};

export const toggleTheme = () => ({
	type: TOGGLE_THEME,
});

export default themeReducer;
