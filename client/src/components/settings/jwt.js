import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const JWT_COOKIE = 'jwt';
const JWT_LOCALSTORAGE = 'token';

const state = {
    token: null,
};

const getters = {
    jwt: ({ token }) => token,
    jwtPayload ({ token }) {
        return token ? jwtDecode(token) : null;
    },
};

const CLEAR_JWT = 'CLEAR_JWT';
const SET_JWT = 'SET_JWT';

const mutations = {
    [CLEAR_JWT] (state) {
        state.token = null;
        localStorage.removeItem(JWT_LOCALSTORAGE);
    },
    [SET_JWT] (state, jwt) {
        state.token = jwt;
        localStorage.setItem(JWT_LOCALSTORAGE, jwt);
    },
};

export { CLEAR_JWT };
export const LOAD_JWT = 'LOAD_JWT';

const actions = {
    [CLEAR_JWT] ({ commit }) {
        commit(CLEAR_JWT);
    },
    [LOAD_JWT] ({ commit }) {
        let jwt;
        // check cookie
        jwt = Cookies.get(JWT_COOKIE);
        if (jwt) {
            commit(SET_JWT, jwt);
            Cookies.remove(JWT_COOKIE);
            return;
        }
        // check localstorage
        jwt = localStorage.getItem(JWT_LOCALSTORAGE);
        if (jwt) {
            commit(SET_JWT, jwt);
            return;
        }
        // if all unset then doesn't have jwt
        commit(CLEAR_JWT);
    },
};

export const __types = {
    constants: {
        JWT_COOKIE,
        JWT_LOCALSTORAGE,
    },
    mutations: {
        CLEAR_JWT,
        SET_JWT,
    },
    actions: {
        CLEAR_JWT,
        LOAD_JWT,
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
