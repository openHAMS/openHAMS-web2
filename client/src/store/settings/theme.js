import { settingsApi } from '@/api';
//types
export const mutationTypes = {
    SET_DARK_THEME: 'SET_DARK_THEME',
};

export const actionTypes = {
    TOGGLE_THEME: 'TOGGLE_THEME',
};


const state = {
    darkTheme: false,
};

const getters = {
    darkTheme: state => state.darkTheme,
};

const {
    SET_DARK_THEME,
} = mutationTypes;
const mutations = {
    [SET_DARK_THEME] (state, darkTheme) {
        state.darkTheme = (darkTheme === true); // fallback to false
    },
};

const {
    TOGGLE_THEME,
} = actionTypes;
const actions = {
    [TOGGLE_THEME] ({ commit, state }) {
        const newDarkTheme = !state.darkTheme;
        settingsApi.postDarkTheme(newDarkTheme);
        commit(SET_DARK_THEME, newDarkTheme);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
