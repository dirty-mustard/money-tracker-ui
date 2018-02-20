export default {
    changeCriteria(state, criteria) {
        state.criteria = criteria;
    },
    loadTransactions(state, transactions) {
        state.transactions = transactions;
    },
    loadTags(state, tags) {
        state.tags = tags;
    },
    setLoading(state, enabled) {
        state.loading = enabled;
    },
    beginToCreateFilter(state) {
        state.loaders.showBusyWithCreatingFilter = true;
    },
    beginToCreateRule(state) {
        state.loaders.showBusyWithCreatingRule = true;
    },
    ErrorOccurredDuringRuleCreation(state) {
        state.loaders.showBusyWithCreatingRule = false;
    },
    ruleHasBeenCreatedSuccessfully(state) {
        state.loaders.showBusyWithCreatingRule = false;
        state.panels.showRuleQuickCreatePanel = false;
    },
    filterHasBeenCreatedSuccessfully(state) {
        state.loaders.showBusyWithCreatingFilter = false;
        state.loaders.showFilterHasBeenCreatedSuccessfully = true;
    },
    finalizeFilterCreation(state) {
        state.loaders.showBusyWithCreatingFilter = false;
        state.loaders.showFilterHasBeenCreatedSuccessfully = false;
    },
    openRuleQuickCreatePanel(state) {
        state.panels.showRuleQuickCreatePanel = true;
    },
    closeRuleQuickCreatePanel(state) {
        state.panels.showRuleQuickCreatePanel = false;
    }
}
