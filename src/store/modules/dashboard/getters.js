export default {
    transactions(state) {
        return state.transactions;
    },
    filters(state) {
        return state.filters;
    },
    canFilterBeSaved(state) {
        return (Object.keys(state.criteria).length > 0 && state.criteria.constructor === Object)
            && !state.loaders.showBusyWithCreatingFilter
            && !state.loaders.showFilterHasBeenCreatedSuccessfully;
    },
    tags(state) {
        return state.tags;
    },
    rules(state) {
        return state.rules;
    },
    reports(state) {
        return state.reports;
    },
    searchCriteria(state) {
        return state.criteria;
    },
    incomeTransactionsOnly(state) {
        return state.transactions.filter((t) => t.amount > 0);
    },
    expenseTransactionsOnly(state) {
        return state.transactions.filter((t) => t.amount < 0);
    },
    loading(state) {
        return state.loading;
    },
    showBusyWithCreatingFilter(state) {
        return state.loaders.showBusyWithCreatingFilter;
    },
    showBusyWithCreatingRule(state) {
        return state.loaders.showBusyWithCreatingRule;
    },
    showFilterHasBeenCreatedSuccessfully(state) {
        return state.loaders.showFilterHasBeenCreatedSuccessfully;
    },
    showRuleQuickCreatePanel(state) {
        return state.panels.showRuleQuickCreatePanel;
    }
};
