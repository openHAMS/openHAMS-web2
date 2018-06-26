const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

const state = {
    darkTheme: false,
};

function getThemeString(isDarkTheme) {
    return isDarkTheme ? DARK_THEME : LIGHT_THEME;
}

const getters = {
    theme: state => getThemeString(state.darkTheme),
    isDarkTheme: state => state.darkTheme,
};

const mutations = {
    setTheme (state, value) {
        state.darkTheme = (value === DARK_THEME);
    },
    toggleTheme (state) {
        state.darkTheme = !state.darkTheme;
    },
};

const actions = {
    $initTheme ({ commit }) {
        // TODO: get from server
        commit('setTheme', LIGHT_THEME);
    },
    toggleTheme ({ commit, state }) {
        const newTheme = getThemeString(!state.darkTheme);
        // TODO: send to server
        commit('setTheme', newTheme);
    },
};

export default {
    namespaced: false,
    state,
    getters,
    mutations,
    actions,
};