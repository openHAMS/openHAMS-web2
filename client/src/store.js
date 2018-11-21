import Vue from 'vue';
import Vuex from 'vuex';
import omit from 'lodash-es/omit';
import { storeApiPlugin } from './api';
import createPersistedState from 'vuex-persistedstate';
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
        createPersistedState({
            reducer: (state) => {
                // persist all except internal states and JWT
                const internal = [
                    'error',
                    'isLoading',
                ];
                const excluded = [
                    'jwt',
                ];
                return omit(state.settings, [...internal, ...excluded]);
            },
        }),
    ],
});
