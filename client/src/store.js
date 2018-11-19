import Vue from 'vue';
import Vuex from 'vuex';
import { storeApiPlugin } from './api';
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
        storeApiPlugin,
        store => store.dispatch(CHECK_AUTH),
    ],
});
