// types
export const mutationTypes = {
    SET_PROFILE: 'SET_PROFILE',
    CLEAR_PROFILE: 'CLEAR_PROFILE',
};


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

const {
    SET_PROFILE,
    CLEAR_PROFILE,
} = mutationTypes;
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

export default {
    state,
    getters,
    mutations,
};
