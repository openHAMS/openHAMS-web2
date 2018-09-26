import Vue from 'vue';
import Vuex from 'vuex';
import dashboard from './components/dashboard/DashboardStoreModule';
import settings from './components/settings';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        dashboard,
        settings,
    },
    strict: true,
    plugins: [
        store => store.dispatch('settings/$init'),
    ],
});
