import Vue from 'vue';
import Vuex from 'vuex';
import dashboard from './components/dashboard/DashboardStoreModule';
import settings, { CHECK_AUTH } from './components/settings';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        dashboard,
        settings,
    },
    strict: true,
    plugins: [
        store => store.dispatch(CHECK_AUTH),
    ],
});
