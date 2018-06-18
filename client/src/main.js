// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// Vuetify component framework
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';
Vue.use(Vuetify, {
    theme: {
        accent: colors.blue.base
    }
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
