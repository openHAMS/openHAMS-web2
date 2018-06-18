const state = () => ({
    cards: [
        { type: 'sensor', id: 'rcr/livingroom/temp', title: 'Temperature' },
        { type: 'sensor', id: 'rcr/livingroom/pres', title: 'Pressure' },
        { type: 'led', id: 'rcr/livingroom/led', title: 'asdasd' },
    ],
});

const getters = {
    cards: state => {
        return state.cards;
    }
};

const actions = {
    getCards () {
    },
};

const mutations = {
    setCards () {
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};