const state = () => ({
    cards: [
        { type: 'sensor', id: 'rcr/livingroom/temp', title: 'Temperature' },
        { type: 'sensor', id: 'rcr/livingroom/pres', title: 'Pressure' },
        { type: 'led', id: 'rcr/livingroom/led', title: 'asdasd' },
    ],
});

const getters = {
    cards: state => state.cards,
};

const mutations = {
    reorderCards (state, { oldIndex, newIndex }) {
        const { cards } = state;
        const [ movedCard ] = cards.splice(oldIndex, 1);
        cards.splice(newIndex, 0, movedCard);
    },
};

const actions = {
    reorderCards ({ commit }, { oldIndex, newIndex }) {
        commit('reorderCards', { oldIndex, newIndex });
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};