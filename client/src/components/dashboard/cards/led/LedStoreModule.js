const state = () => ({
    availableColors: [],
    enabled: false,
    selectedColorId: -1,
    brightness: -1,
});

const getters = {
    brightness: state => (state.enabled ? state.brightness : 0),
    selectedColor: state => {
        if (!state.enabled) {
            return { hue: 0, saturation: 0, lightness: 0 };
        }
        const selectedColor = state.availableColors[state.selectedColorId];
        return {
            // clamping
            hue: Math.min(Math.max(selectedColor.color.hue, 0), 360),
            saturation: Math.min(Math.max(state.brightness, 0), 100),
            lightness: Math.min(Math.max(selectedColor.color.saturation, 50), 100),
        };
    },
    selectedColorId: state => state.selectedColorId,
};

const mutations = {
    setAvailableColors (state, availableColors) { state.availableColors = availableColors; },
    setBrightness (state, brightness) {
        state.enabled = (brightness > 0);
        state.brightness = brightness;
    },
    setEnabled (state, enabled) { state.enabled = enabled; },
    setSelectedColorId (state, selectedColorId) {
        const colorIds = state.availableColors.map(color => color.id);
        if (!colorIds.includes(selectedColorId)) {
            throw new Error(`Invalid ColorId. AvailableColors does not contain color with id of '${selectedColorId}'.`);
        }
        state.selectedColorId = selectedColorId;
    },
};

const actions = {
    $init ({ commit }) {
        const availableColors = [
            { id: 0, name: 'red', color: { hue: 0, saturation: 10 } },
            { id: 1, name: 'green', color: { hue: 90, saturation: 50 } },
            { id: 2, name: 'blue', color: { hue: 180, saturation: 50 } },
            { id: 3, name: 'Smaragdine', color: { hue: 240, saturation: 50 } },
        ];
        commit('setAvailableColors', availableColors);
        commit('setSelectedColorId', 0);
        commit('setEnabled', true);
        commit('setBrightness', 70);
    },
    setBrightness ({ commit }, brightness) {
        commit('setBrightness', brightness);
    },
    setSelectedColorId ({ commit }, selectedColorId) {
        commit('setSelectedColorId', selectedColorId);
    },
    toggleEnabled ({ commit, state }) {
        const { brightness, enabled } = state;
        if (enabled === false && brightness === 0) {
            commit('setBrightness', 10);
        }
        commit('setEnabled', !enabled);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
