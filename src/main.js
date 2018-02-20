import Vue from 'vue';

import App from './App.vue';

// Routing
import VueRouter from 'vue-router';
import './router';

// Templating
import BootstrapVue from 'bootstrap-vue';

// Http
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuth from '@websanova/vue-auth'
import { API_ENDPOINT } from './settings';

// 3th party libraries
import VueNumeric from 'vue-numeric';
import VueMoment from 'vue-moment';
import lodash from 'lodash';
import VueLodash from 'vue-lodash';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { store } from './store/store';

Vue.use(BootstrapVue);
Vue.use(VueRouter);

Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = API_ENDPOINT;

Vue.use(VueAuth, {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js')
});

// 3th Party libraries
Vue.use(VueNumeric);
Vue.use(VueMoment);
Vue.use(VueLodash, lodash);

new Vue({
    el: '#app',
    store: store,
    router: Vue.router,
    render: h => h(App)
});
