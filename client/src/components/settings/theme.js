const state = {
    darkTheme: false,
};

const getters = {
    darkTheme: state => state.darkTheme,
};

export const SET_DARK_THEME = 'SET_DARK_THEME';

const mutations = {
    [SET_DARK_THEME] (state, darkTheme) {
        state.darkTheme = darkTheme;
    },
};

const TOGGLE_THEME = 'TOGGLE_THEME';

export const actionTypes = {
    TOGGLE_THEME,
};

const actions = {
    [TOGGLE_THEME] ({ commit, state }) {
        // TODO: send to server
        commit(SET_DARK_THEME, !state.darkTheme);
    },
};

export const __types = {
    mutations: {
        SET_DARK_THEME,
    },
    actions: {
        TOGGLE_THEME,
    },
};


export default {
    state,
    getters,
    mutations,
    actions,
};
