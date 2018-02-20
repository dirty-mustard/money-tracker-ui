import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import moment from "moment/moment";

const state = {
    transactions: [],
    filters: [],
    tags: [],
    rules: [],
    reports: [],
    criteria: {
        from: moment().startOf('month').format('YYYY-MM-DD'),
        to: moment().endOf('month').format('YYYY-MM-DD'),
    },
    loading: false,
    panels: {
        showRuleQuickCreatePanel: false
    },
    loaders: {
        showBusyWithCreatingFilter: false,
        showBusyWithCreatingRule: false,
        showFilterHasBeenCreatedSuccessfully: false,
    }
};

export default {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
};
