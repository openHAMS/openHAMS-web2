import { userApi } from '../../api';
import jwt, {
    LOAD_JWT,
} from './jwt.js';
import profile, {
    SET_PROFILE,
    CLEAR_PROFILE,
} from './profile';
import theme, {
    SET_DARK_THEME,
} from './theme';

const state = {
    error: null,
    isLoading: null,
    isLoggedIn: null,
};

const SET_PENDING = 'SET_PENDING';
const SET_LOGGED_IN = 'SET_LOGGED_IN';
const SET_NOT_LOGGED_IN = 'SET_NOT_LOGGED_IN';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';

const mutations = {
    [SET_PENDING] (state) {
        state.isLoading = true;
        state.isLoggedIn = false;
    },
    [SET_LOGGED_IN] (state) {
        state.isLoading = false;
        state.isLoggedIn = true;
    },
    [SET_NOT_LOGGED_IN] (state) {
        state.isLoading = false;
        state.isLoggedIn = false;
    },
    [SET_LOGIN_ERROR] (state, err) {
        state.isLoading = false;
        state.isLoggedIn = null;
        state.error = err;
    },
};

export const CHECK_AUTH = 'CHECK_AUTH';
const USER_PENDING = 'USER_PENDING';
const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
const USER_AUTH_ERROR = 'USER_AUTH_ERROR';

const actions = {
    [USER_PENDING] ({ commit }, { profile: cachedProfile }) {
        commit(SET_PENDING);
        commit(SET_PROFILE, cachedProfile);
    },
    [USER_AUTHENTICATED] ({ commit }, { profile: userProfile, settings: userSettings }) {
        commit(SET_LOGGED_IN);
        commit(SET_PROFILE, userProfile);
        commit(SET_DARK_THEME, userSettings.darkTheme);
    },
    [USER_UNAUTHENTICATED] ({ commit }) {
        commit(SET_NOT_LOGGED_IN);
        commit(CLEAR_PROFILE);
    },
    [USER_AUTH_ERROR] ({ commit }) {
        commit(CLEAR_PROFILE);
    },
    async [CHECK_AUTH] ({ dispatch, getters }) {
        await dispatch(LOAD_JWT);
        const { jwtPayload } = getters;
        if (!jwtPayload) {
            dispatch(USER_UNAUTHENTICATED);
            return;
        }
        dispatch(USER_PENDING, jwtPayload);
        const response = await userApi.fetchUser();
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
        jwt,
        profile,
        theme,
    },
    state,
    mutations,
    actions,
};
