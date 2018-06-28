import Vue from 'vue';
import Vuex from 'vuex';
import dashboard from './modules/dashboard';
import theme from './modules/theme';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        dashboard,
        theme,
    },
    strict: true,
    plugins: [
        store => store.dispatch('$initTheme'),
    ],
});
