'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import ledcard from './modules/ledcard';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        ledCard
    }
});