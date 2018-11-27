// types
export const mutationTypes = {
    ADD_CARD: 'ADD_CARD',
    SET_CARDS: 'SET_CARDS',
    REORDER_CARDS: 'REORDER_CARDS',
    SET_EDIT_MODE: 'SET_EDIT_MODE',
};

export const actionTypes = {
    ADD_CARD: 'ADD_CARD',
    REORDER_CARDS: 'REORDER_CARDS',
    SET_EDIT_MODE: 'SET_EDIT_MODE',
};


const state = () => ({
    // fn instead obj to ensure it is reusable
    cards: [],
    editMode: false,
});

const {
    ADD_CARD: M_ADD_CARD,
    SET_CARDS,
    REORDER_CARDS: M_REORDER_CARDS,
    SET_EDIT_MODE: M_SET_EDIT_MODE,
} = mutationTypes;
const mutations = {
    [M_ADD_CARD] (state, card) {
        // TODO: sanitize card fields
        state.cards.push(card);
    },
    [SET_CARDS] (state, cards) {
        state.cards = cards;
    },
    [M_REORDER_CARDS] (state, { oldIndex, newIndex }) {
        const { cards } = state;
        const [ movedCard ] = cards.splice(oldIndex, 1);
        cards.splice(newIndex, 0, movedCard);
    },
    [M_SET_EDIT_MODE] (state, editMode) {
        state.editMode = editMode;
    },
};

const {
    SET_EDIT_MODE: A_SET_EDIT_MODE,
} = actionTypes;
const actions = {
    $init ({ commit }) {
        // TEMPORARY
        const cards = [
            { type: 'sensor', id: 'livingroom/temp', title: 'Temperature' },
            { type: 'sensor', id: 'livingroom/pres', title: 'Pressure' },
            { type: 'led', id: 'livingroom/led', title: 'asdasd' },
            { type: 'launch-calendar' },
        ];
        commit(SET_CARDS, cards);
    },
    addCard ({ commit }, card) {
        commit(M_ADD_CARD, card);
    },
    reorderCards ({ commit }, { oldIndex, newIndex }) {
        commit(M_REORDER_CARDS, { oldIndex, newIndex });
    },
    [A_SET_EDIT_MODE] ({ commit }, editMode) {
        commit(M_SET_EDIT_MODE, editMode);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
