<template>
    <b-row class="mb-4">

        <b-col class="col-12 mb-2">

            <b-row>
                <b-col cols="4">
                    <b-card class="incoming-transactions" text-variant="white">
                        <b-row>
                            <b-col>
                                <h2>Income</h2>
                            </b-col>
                            <b-col>
                                <p class="text-right lead">
                                    <vue-numeric
                                            v-model="totalIncome"
                                            currency="€"
                                            read-only
                                            v-bind:precision="2"
                                            output-type="String"
                                    ></vue-numeric>
                                </p>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <transactions-line-chart
                                        :height="20"
                                        :transactions="incomeTransactionsOnly"
                                ></transactions-line-chart>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>

                <b-col cols="4">
                    <b-card class="expense-transactions" text-variant="white">

                        <b-row>
                            <b-col>
                                <h2 class="float-left">Expense</h2>
                            </b-col>
                            <b-col>
                                <p class="float-right lead">
                                    <vue-numeric
                                            v-model="totalExpense"
                                            currency="€"
                                            read-only
                                            minus
                                            v-bind:precision="2"
                                            output-type="String"
                                    ></vue-numeric>
                                </p>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <transactions-line-chart
                                        :height="20"
                                        :transactions="expenseTransactionsOnly"
                                ></transactions-line-chart>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>

                <b-col cols="4">
                    <b-card class="balance-transactions" text-variant="white">
                        <b-row>
                            <b-col>
                                <h2 class="float-left">Balance</h2>
                            </b-col>
                            <b-col>
                                <p class="float-right lead">
                                    <vue-numeric
                                            v-model="totalBalance"
                                            currency="€"
                                            read-only
                                            minus
                                            v-bind:precision="2"
                                            output-type="String"
                                    ></vue-numeric>
                                </p>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <transactions-line-chart
                                        :height="20"
                                        :transactions="transactions"
                                ></transactions-line-chart>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>

            </b-row>

        </b-col>

        <b-col class="col-12">
            <b-row>
                <b-col cols="4">

                    <b-row>
                        <b-col>
                            <b-card id="app-manage-transactions-amount-container">
                                <p>{{ this.transactions.length }} Hits</p>
                            </b-card>
                        </b-col>
                    </b-row>

                    <b-card class="card" id="app-manage-transactions-filter-container">
                        <b-row>
                            <b-col>
                                <h2>Filter by criteria</h2>
                            </b-col>
                            <b-col md="auto">
                                <b-button
                                        :disabled="!canFilterBeSaved || showBusyWithCreatingRule"
                                        class="text-right"
                                        variant="link"
                                        size="sm"
                                        @click="openRuleQuickCreatePanel"
                                        v-b-popover.hover.top="`In the future, you can automatically assign tags to transactions based on current search criteria.`"
                                >
                                    <font-awesome-icon
                                            v-if="!showBusyWithCreatingRule"
                                            size="1x"
                                            :icon="iconCog" />
                                    <font-awesome-icon
                                            v-if="showBusyWithCreatingRule"
                                            class="loader"
                                            size="1x"
                                            :icon="iconSpinner" spin />
                                </b-button>
                                <b-button
                                        :disabled="!canFilterBeSaved"
                                        class="text-right"
                                        variant="link"
                                        size="sm"
                                        @click="createFilterOnClick"
                                        v-b-popover.hover.top="'Save current search criteria in a filter'"
                                >
                                    <font-awesome-icon
                                            v-if="!showBusyWithCreatingFilter && !showFilterHasBeenCreatedSuccessfully"
                                            size="1x"
                                            :icon="iconSave"
                                    />
                                    <font-awesome-icon
                                            v-if="showFilterHasBeenCreatedSuccessfully"
                                            size="1x"
                                            :icon="iconCheck"
                                    />
                                    <font-awesome-icon
                                            v-if="showBusyWithCreatingFilter"
                                            class="loader"
                                            size="1x"
                                            :icon="iconSpinner" spin
                                    />
                                </b-button>
                            </b-col>
                        </b-row>

                        <b-row v-if="showRuleQuickCreatePanel">
                            <b-col id="rule-quick-create-container">
                                <rule-quick-create></rule-quick-create>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col>
                                <FilterForm
                                        :possibleTags="tags"
                                        :filter="searchCriteria"
                                ></FilterForm>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>

                <b-col cols="8">

                    <quick-filters></quick-filters>

                    <b-card id="app-home-list-transaction-container" >
                        <div class="d-flex justify-content-center" v-if="loading">
                            <font-awesome-icon class="loader" size="4x" :icon="iconSpinner" spin/>
                        </div>

                        <template v-if="!loading">
                            <list-transactions :transactions="transactions"></list-transactions>
                        </template>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>

    </b-row>
</template>

<script>
    import ListTransactions from './components/list-transactions';
    import FilterForm from './components/filter-form';
    import QuickFilters from './components/quick-filters';
    import RuleQuickCreate from './components/rule-quick-create';

    import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
    import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner'
    import faSave from '@fortawesome/fontawesome-free-solid/faSave'
    import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'
    import faCog from '@fortawesome/fontawesome-free-solid/faCog'

    import TransactionsLineChart from './components/transactions-line-chart'

    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'home',
        data: function () {
            return {
                isPositiveBalance: false,
            }
        },
        mounted() {
            this.loadTransactions();
            this.loadTags();
        },
        components: {
            ListTransactions,
            FontAwesomeIcon,
            FilterForm,
            TransactionsLineChart,
            QuickFilters,
            RuleQuickCreate
        },
        computed: {
            ...mapGetters('dashboard', {
                transactions: 'transactions',
                filters: 'filters',
                tags: 'tags',
                searchCriteria: 'searchCriteria',
                incomeTransactionsOnly: 'incomeTransactionsOnly',
                expenseTransactionsOnly: 'expenseTransactionsOnly',
                loading: 'loading',
                showBusyWithCreatingFilter: 'showBusyWithCreatingFilter',
                showBusyWithCreatingRule: 'showBusyWithCreatingRule',
                showFilterHasBeenCreatedSuccessfully: 'showFilterHasBeenCreatedSuccessfully',
                canFilterBeSaved: 'canFilterBeSaved',
                showRuleQuickCreatePanel: 'showRuleQuickCreatePanel'
            }),
            iconSpinner() {
                return faSpinner
            },
            iconSave() {
                return faSave
            },
            iconCheck() {
                return faCheck
            },
            iconCog() {
                return faCog
            },
            totalIncome: {
                get() {
                    const reducer = (accumulator, currentValue) => accumulator + currentValue;
                    return this.incomeTransactionsOnly
                        .map((transaction) => transaction.amount)
                        .reduce(reducer, 0);
                },
                set(value) {}
            },
            totalExpense: {
                get() {
                    const reducer = (accumulator, currentValue) => accumulator - currentValue;
                    return this.expenseTransactionsOnly
                        .map((transaction) => transaction.amount)
                        .reduce(reducer, 0)
                },
                set(value) {}
            },
            totalBalance: {
                get() {
                    return this.totalIncome - this.totalExpense;
                },
                set(value) {}
            }
        },
        methods: {
            ...mapActions('dashboard', {
                loadTransactions: 'LOAD_TRANSACTIONS',
                loadTags: 'LOAD_TAGS',
                changeFilterCriteria: 'CHANGE_FILTER_CRITERIA',
                createFilter: 'CREATE_FILTER_FROM_CURRENT_CRITERIA',
                openRuleQuickCreatePanel: 'INITIALIZE_RULE_QUICK_CREATE_PROCESS'
            }),
            createFilterOnClick() {
                let filterName = prompt("Please enter a name for the filter");
                if (filterName != null) {
                    this.createFilter(filterName);
                    filterName = null;
                }
            }
        }
    }

</script>

<style lang="scss">

    #app-manage-transactions-amount-container {
        margin: 0;
        padding: 0;
        border: 0;

        text-align: center;

        p {
            margin: 0;
            font-weight: bolder;
        }

        .card-body {
            padding: 0.4rem;
        }
    }

    #app-manage-transactions-filter-container {

        .card-body {
            padding: 1rem;
            background-color: rgba(222, 224, 225, 0.2) !important
        }

        .table thead th {
            border-bottom: 0;
            border-top: 0;
        }
    }

    #home-filter-selector, #home-description-selector {
        line-height: 40px;
        margin-bottom: 0;
    }

    #app-home-list-transaction-container {
        .card-body {
            padding: 0;
        }

        .loader {
            margin: 1rem;
        }
    }

    .balance-transactions {
        background: #afb3b4; /* Old browsers */
        background: -moz-linear-gradient(top, #afb3b4 0%, #8e9eab 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(top, #afb3b4 0%, #8e9eab 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom, #afb3b4 0%, #8e9eab 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#afb3b4', endColorstr='#8e9eab', GradientType=0);
    }

    .incoming-transactions {
        background: #56ab2f; /* Old browsers */
        background: -moz-linear-gradient(top, #629e4c 0%, #56ab2f 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(top, #629e4c 0%, #56ab2f 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom, #629e4c 0%, #56ab2f 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#629e4c', endColorstr='#76b852', GradientType=0);
    }

    .expense-transactions {
        background: #BD3F32; /* Old browsers */
        background: -moz-linear-gradient(top, #BD3F32 0%, #a73737 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(top, #BD3F32 0%, #a73737 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom, #BD3F32 0%, #a73737 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#BD3F32', endColorstr='#a73737', GradientType=0);
    }

    #rule-quick-create-container {
        padding: 0;
        margin: 0;
        /*border: 0;*/
        background-color: rgba(222, 224, 225, 0.4) !important;
        border-top: 1px solid rgba(222, 224, 225, 0.8) !important;
        border-bottom: 1px solid rgba(222, 224, 225, 0.8) !important;
    }
</style>
