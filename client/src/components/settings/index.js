import theme from './theme';

const settingModules = [
    theme,
];

const settings = settingModules.reduce((acc, curr) => {
    Object.keys(acc).forEach(k => {
        acc[k] = { ...acc[k], ...curr[k] };
    });
    return acc;
}, {
    state: {},
    getters: {},
    mutations: {},
    actions: {
        $init ({ dispatch }) {
            dispatch('$initTheme');
        },
    },
});

export default {
    namespaced: true,
    ...settings,
};
