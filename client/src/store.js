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
            getState: (key, storage) => {
                // default getState fn from https://github.com/robinvdvleuten/vuex-persistedstate/blob/master/index.js
                // refactored & modified to check JWT token
                const value = storage.getItem(key);
                if (!value) {
                    return undefined;
                }
                try {
                    if (!localStorage.getItem('token')) {
                        throw new Error('Store inconsistency error. Persisted vuex state present without token.');
                    }
                    return JSON.parse(value);
                } catch (err) {
                    storage.removeItem(key);
                    return undefined;
                }
            },
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
