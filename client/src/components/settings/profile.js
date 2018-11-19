const state = {
    name: null,
    photoUrl: null,
};

const getters = {
    profile: (state, _g, rootState) => (
        rootState.settings.isLoggedIn
            ? ({
                name: state.name,
                photoUrl: state.photoUrl,
            })
            : rootState.settings.isLoggedIn
    ),
};

export const SET_PROFILE = 'SET_PROFILE';
export const CLEAR_PROFILE = 'CLEAR_PROFILE';

const mutations = {
    [SET_PROFILE] (state, { name, photo }) {
        state.name = name;
        state.photoUrl = photo;
    },
    [CLEAR_PROFILE] (state) {
        state.name = null;
        state.photoUrl = null;
    },
};

export const __types = {
    mutations: {
        SET_PROFILE,
        CLEAR_PROFILE,
    },
};

export default {
    state,
    getters,
    mutations,
};
