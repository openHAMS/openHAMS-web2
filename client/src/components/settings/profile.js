const state = {
    isLoggedIn: null,
    name: null,
    photoUrl: null,
};

const getters = {
    profile: state => (
        state.isLoggedIn
            ? ({
                name: state.name,
                photoUrl: state.photoUrl,
            })
            : state.isLoggedIn
    ),
};

const LOGGED_IN = 'LOGIN_SUCCESS';
const NOT_LOGGED_IN = 'NOT_LOGGED_IN';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const mutations = {
    [LOGGED_IN] (state, profile) {
        state.isLoggedIn = true;
        state.name = profile.name;
        state.photoUrl = profile.photo;
    },
    [NOT_LOGGED_IN] (state) {
        state.isLoggedIn = false;
        state.name = null;
        state.photoUrl = null;
    },
    [LOGIN_FAILURE] (state) {
        state.isLoggedIn = null;
        state.name = null;
        state.photoUrl = null;
    },
};

export const $INIT = '$INIT_PROFILE';

const actions = {
    async [$INIT] ({ commit }) {
        const response = await fetch('/api/user');
        if (!response.ok) {
            response.status === 401
                ? commit(NOT_LOGGED_IN)
                : commit(LOGIN_FAILURE);
            return;
        }
        const profileData = await response.json();
        commit(LOGGED_IN, profileData.profile);
    },
};

export const __types = {
    mutations: {
        LOGGED_IN,
        NOT_LOGGED_IN,
        LOGIN_FAILURE,
    },
    actions: {
        $INIT,
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
