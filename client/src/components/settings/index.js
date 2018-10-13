import profile, {
    SET_PROFILE_AUTHENTICATED,
    SET_PROFILE_UNAUTHENTICATED,
} from './profile';
import theme, {
    SET_DARK_THEME,
} from './theme';

const state = {
    error: null,
    isLoggedIn: null,
};

const SET_LOGGED_IN = 'SET_LOGGED_IN';
const SET_NOT_LOGGED_IN = 'SET_NOT_LOGGED_IN';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';

const mutations = {
    [SET_LOGGED_IN] (state) {
        state.isLoggedIn = true;
    },
    [SET_NOT_LOGGED_IN] (state) {
        state.isLoggedIn = false;
    },
    [SET_LOGIN_ERROR] (state, err) {
        state.isLoggedIn = null;
        state.error = err;
    },
};

export const CHECK_AUTH = 'CHECK_AUTH';
const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
const USER_AUTH_ERROR = 'USER_AUTH_ERROR';

const actions = {
    [USER_AUTHENTICATED] ({ commit }, user) {
        commit(SET_LOGGED_IN);
        commit(SET_PROFILE_AUTHENTICATED, user.profile);
        commit(SET_DARK_THEME, user.settings.darkTheme);
    },
    [USER_UNAUTHENTICATED] ({ commit }) {
        commit(SET_NOT_LOGGED_IN);
        commit(SET_PROFILE_UNAUTHENTICATED);
    },
    [USER_AUTH_ERROR] ({ commit }) {
        commit(SET_PROFILE_UNAUTHENTICATED);
    },
    async [CHECK_AUTH] ({ dispatch }) {
        const response = await fetch('/api/user');
        if (!response.ok) {
            if (response.status === 401) {
                dispatch(USER_UNAUTHENTICATED);
            }
            else {
                dispatch(USER_AUTH_ERROR);
            }
            return;
        }
        const currentUser = await response.json();
        dispatch(USER_AUTHENTICATED, currentUser);
    },
};

export default {
    namespaced: false,
    modules: {
        profile,
        theme,
    },
    state,
    mutations,
    actions,
};
