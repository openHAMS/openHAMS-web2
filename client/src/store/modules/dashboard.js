const state = () => ({
    cards: [],
});

const getters = {
    cards: state => state.cards,
};

const mutations = {
    setCards (state, value) {
        state.cards = value;
    },
    reorderCards (state, { oldIndex, newIndex }) {
        const { cards } = state;
        const [ movedCard ] = cards.splice(oldIndex, 1);
        cards.splice(newIndex, 0, movedCard);
    },
};

const actions = {
    $init ({ commit }) {
        // TEMPORARY
        const cards = [
            { type: 'sensor', id: 'livingroom/temp', title: 'Temperature' },
            { type: 'sensor', id: 'livingroom/pres', title: 'Pressure' },
            { type: 'led', id: 'livingroom/led', title: 'asdasd' },
        ];
        commit('setCards', cards);
    },
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