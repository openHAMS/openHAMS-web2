const state = () => ({
    availableColors: [
        { id: 0, name: 'red', color: { hue: 0, saturation: 10 } },
        { id: 1, name: 'green', color: { hue: 90, saturation: 50 } },
        { id: 2, name: 'blue', color: { hue: 180, saturation: 50 } },
        { id: 3, name: 'Smaragdine', color: { hue: 240, saturation: 50 } },
    ],
    enabled: true,
    selectedColorId: 0,
    brightness: 70,
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
    setBrightness (state, value) {
        state.enabled = value !== 0;
        state.brightness = value;
    },
    setSelectedColorId (state, value) {
        state.selectedColorId = value;
    },
    toggleEnabled (state) {
        if (state.enabled !== true && state.brightness === 0)
            state.brightness = 10;
        state.enabled = !state.enabled;
    },
};

const actions = {
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};