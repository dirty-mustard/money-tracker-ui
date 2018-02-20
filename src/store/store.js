import Vue from 'vue';

import Vuex from 'vuex';
Vue.use(Vuex);

import dashboard from './modules/dashboard';

export const store = new Vuex.Store({
    modules: {
        dashboard
    }
});
