const state = {
    name: null,
    photoUrl: null,
};

const getters = {
    profile: (_s, _g, rootState) => (
        rootState.settings.isLoggedIn
            ? ({
                name: state.name,
                photoUrl: state.photoUrl,
            })
            : rootState.settings.isLoggedIn
    ),
};

export const SET_PROFILE_AUTHENTICATED = 'SET_PROFILE_AUTHENTICATED';
export const SET_PROFILE_UNAUTHENTICATED = 'SET_PROFILE_UNAUTHENTICATED';

const mutations = {
    [SET_PROFILE_AUTHENTICATED] (state, { name, photo }) {
        state.name = name;
        state.photoUrl = photo;
    },
    [SET_PROFILE_UNAUTHENTICATED] (state) {
        state.name = null;
        state.photoUrl = null;
    },
};

export const __types = {
    mutations: {
        SET_PROFILE_AUTHENTICATED,
        SET_PROFILE_UNAUTHENTICATED,
    },
};

export default {
    state,
    getters,
    mutations,
};
