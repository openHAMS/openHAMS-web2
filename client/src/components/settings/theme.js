const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

const state = {
    darkTheme: false,
};

const getters = {
    theme: state => (state.darkTheme ? DARK_THEME : LIGHT_THEME),
};

const SET_THEME = 'SET_THEME';

const mutations = {
    [SET_THEME] (state, newTheme) {
        state.darkTheme = (newTheme === DARK_THEME);
    },
};

export const $INIT = '$INIT';
const TOGGLE_THEME = 'TOGGLE_THEME';
export const actionTypes = {
    TOGGLE_THEME,
};

const actions = {
    [$INIT] ({ commit }) {
        // TODO: get from server
        commit(SET_THEME, LIGHT_THEME);
    },
    [TOGGLE_THEME] ({ commit, state }) {
        const newState = {
            darkTheme: !state.darkTheme,
        };
        const newTheme = getters.theme(newState);
        // TODO: send to server
        commit(SET_THEME, newTheme);
    },
};

export const __types = {
    mutations: {
        SET_THEME,
    },
    actions: {
        $INIT,
        TOGGLE_THEME,
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
