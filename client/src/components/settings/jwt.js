import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';


// types
export const constants = {
    JWT_COOKIE: 'jwt',
    JWT_LOCALSTORAGE: 'token',
};

export const mutationTypes = {
    CLEAR_JWT: 'CLEAR_JWT',
    SET_JWT: 'SET_JWT',
};

export const actionTypes = {
    CLEAR_JWT: 'CLEAR_JWT',
    LOAD_JWT: 'LOAD_JWT',
};


const {
    JWT_COOKIE,
    JWT_LOCALSTORAGE,
} = constants;

const state = {
    token: null,
};

const getters = {
    jwt: ({ token }) => token,
    jwtPayload ({ token }) {
        return token ? jwtDecode(token) : null;
    },
};

const {
    CLEAR_JWT: M_CLEAR_JWT,
    SET_JWT,
} = mutationTypes;
const mutations = {
    [M_CLEAR_JWT] (state) {
        state.token = null;
        localStorage.removeItem(JWT_LOCALSTORAGE);
    },
    [SET_JWT] (state, jwt) {
        state.token = jwt;
        localStorage.setItem(JWT_LOCALSTORAGE, jwt);
    },
};

const {
    CLEAR_JWT: A_CLEAR_JWT,
    LOAD_JWT,
} = actionTypes;
const actions = {
    [A_CLEAR_JWT] ({ commit }) {
        commit(M_CLEAR_JWT);
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
        commit(M_CLEAR_JWT);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
