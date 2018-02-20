import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '../modules/dashboard/dashboard';
import ManageRules from '../modules/manage-rules';
import ManageTags from '../modules/manage-tags';
import ManageFilters from '../modules/manage-filters';
import Login from '../modules/identity/login';
import Registration from '../modules/identity/registration';

Vue.use(Router);

Vue.router = new Router({
  hashbang: false,
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        auth: true
      }
    },
    {
      path: '/manage-rules',
      name: 'rules',
      component: ManageRules,
      meta: {
        auth: true
      }
    },
    {
      path: '/manage-filters',
      name: 'filters',
      component: ManageFilters,
      meta: {
        auth: true
      }
    },
    {
      path: '/manage-tags',
      name: 'tags',
      component: ManageTags,
      meta: {
        auth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Registration,
      meta: {
        auth: true
      }
    },{
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        auth: false
      }
    }
  ]
});
