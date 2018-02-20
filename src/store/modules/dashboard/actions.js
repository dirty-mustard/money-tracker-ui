import axios from "axios/index";
import _ from 'lodash'

import { API_ENDPOINT } from "../../../settings";

import transactions from "../../../api/transactions"
import rules from "../../../api/rules"
import filters from "../../../api/filters"

export default {
    CHANGE_FILTER_CRITERIA({ commit, dispatch }, criteria) {
        let criteriaWithoutNullValues = { ...criteria };
        criteriaWithoutNullValues = _.omitBy(criteriaWithoutNullValues, _.isNull);
        criteriaWithoutNullValues = _.omitBy(criteriaWithoutNullValues, _.isEmpty);

        if (_.has(criteriaWithoutNullValues, 'tags') && criteriaWithoutNullValues.tags.length === 0) {
            criteriaWithoutNullValues = _.omit(criteriaWithoutNullValues, 'tags');
        }

        commit('changeCriteria', criteriaWithoutNullValues);

        let crForCall = { ...criteriaWithoutNullValues };
        if (_.has(crForCall, 'tags')) {
            crForCall.tags = criteriaWithoutNullValues.tags.map((tag) => tag.value);
        }

        if (_.has(crForCall, 'amountFrom') || _.has(crForCall, 'amountTo')) {
            crForCall.amount = {
                from: crForCall.amountFrom,
                to: crForCall.amountTo
            };
            _.omit(crForCall, ['amountFrom', 'amountTo']);
        }

        transactions.get(crForCall)
            .then(response => {
                commit('loadTransactions', response);
                commit('setLoading', false);
            })
            .catch(error => console.log(error));
    },
    CREATE_FILTER_FROM_CURRENT_CRITERIA({ commit, state }, filterName) {
        commit('beginToCreateFilter');
        filters.create({ ...state.criteria, name: filterName })
            .then(() => {
                commit('filterHasBeenCreatedSuccessfully');
                commit('finalizeFilterCreation');
            });
    },
    CREATE_RULE({ commit }, payload) {
        commit('beginToCreateRule');
        const p = payload;
        filters.create({ ...payload.criteria, name: payload.name })
            .then(
                (filter) => {
                    const payload = {filter: filter.id, tagsToApply: p.tagIds };
                    rules.create(payload)
                        .then(() => {
                            commit('ruleHasBeenCreatedSuccessfully');
                            commit('closeRuleQuickCreatePanel');
                        })
                        .catch(error => {
                            commit('ErrorOccurredDuringRuleCreation');
                            console.log(error)
                        });
                }
            )
            .catch(error => console.log(error));
    },
    LOAD_TAGS({ state, commit }) {
        axios.get(`${API_ENDPOINT}/tags`).then(response => commit('loadTags', response.data));
    },
    LOAD_TRANSACTIONS({ state, commit }) {
        let searchCriteria = { ...state.criteria };
        // Map tags to proper format...
        // From: { value: 1, name: 'Supermarket', value: 2, name: 'Expense' }
        //   To: [1,2]
        if (_.has(searchCriteria.criteria, 'tags')) {
            searchCriteria = {...state.criteria, tags: searchCriteria.criteria.tags.map((tag) => tag.value)};
        }

        if (_.has(searchCriteria.criteria, 'amountFrom') || _.has(searchCriteria.criteria, 'amountTo')) {
            searchCriteria.amount = {
                from: searchCriteria.amountFrom,
                to: searchCriteria.amountTo
            };
            _.omit(searchCriteria, ['amountFrom', 'amountTo']);
        }

        transactions.get(searchCriteria)
            .then(response => {
                commit('loadTransactions', response);
                commit('setLoading', false);
            })
            .catch(error => console.log(error));
    },
    INITIALIZE_RULE_QUICK_CREATE_PROCESS({ commit }) {
        commit('openRuleQuickCreatePanel');
    }
};
