import { userApi } from '../../api';
// jwt module
import jwt, { actionTypes as jwtActionTypes } from './jwt';
const { LOAD_JWT } = jwtActionTypes;
// profile module
import profile, { mutationTypes as profileMutationTypes } from './profile';
const {
    SET_PROFILE,
    CLEAR_PROFILE,
} = profileMutationTypes;
// theme module
import theme, { mutationTypes as themeMutationTypes } from './theme';
const {
    SET_DARK_THEME,
} = themeMutationTypes;


// types
export const mutationTypes = {
    SET_PENDING: 'SET_PENDING',
    SET_LOGGED_IN: 'SET_LOGGED_IN',
    SET_NOT_LOGGED_IN: 'SET_NOT_LOGGED_IN',
    SET_LOGIN_ERROR: 'SET_LOGIN_ERROR',
};

export const actionTypes = {
    CHECK_AUTH: 'CHECK_AUTH',
    USER_PENDING: 'USER_PENDING',
    USER_AUTHENTICATED: 'USER_AUTHENTICATED',
    USER_UNAUTHENTICATED: 'USER_UNAUTHENTICATED',
    USER_AUTH_ERROR: 'USER_AUTH_ERROR',
};


const state = {
    error: null,
    isLoading: null,
    isLoggedIn: null,
};

const {
    SET_PENDING,
    SET_LOGGED_IN,
    SET_NOT_LOGGED_IN,
    SET_LOGIN_ERROR,
} = mutationTypes;
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

const {
    CHECK_AUTH,
    USER_PENDING,
    USER_AUTHENTICATED,
    USER_UNAUTHENTICATED,
    USER_AUTH_ERROR,
} = actionTypes;
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
