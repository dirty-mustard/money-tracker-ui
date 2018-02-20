<template>

    <b-card id="app-filter-form-container" bg-variant="filter-name" class="mb-0">

        <b-form v-on:submit.prevent="onSubmit">

            <div id="app-filter-form-filters-container">
                <div class="filter row justify-content-center">
                    <div class="col">
                        <b-form-group label="Description:"
                                      label-class="text-sm-right"
                                      label-for="dateFrom"
                                      description="eg. Dirk van den broek">
                            <b-form-input
                                    @keyup.enter.native="onSubmit"
                                    id="dateFrom"
                                    v-model="description"
                                    autocomplete="off"
                            ></b-form-input>
                        </b-form-group>
                    </div>
                </div>

                <div class="row filter justify-content-center">
                    <div class="col">
                        <b-form-group label="Search by tag:"
                                      label-class="text-sm-right"
                                      label-for="tags">
                            <multiselect
                                    v-model="tags"
                                    tag-placeholder="Add this as new tag"
                                    placeholder="Search or add a tag"
                                    label="name"
                                    track-by="value"
                                    :options="availableTags"
                                    :multiple="true"
                            ></multiselect>
                        </b-form-group>
                    </div>
                </div>

                <div class="filter row justify-content-center">
                    <b-button variant="link" v-if="!hasDateFilter" size="sm" @click="showDateFilter = true">Filter by
                        date +
                    </b-button>
                    <template v-if="hasDateFilter">
                        <b-button class="col-12" variant="link" size="sm" @click="clearDateFilter">Hide date filter -
                        </b-button>
                        <div class="col">
                            <b-form-group label="From date:"
                                          label-class="text-sm-right"
                                          label-for="dateFrom"
                                          description="eg. 2017-01-01">
                                <b-form-input
                                        type="date"
                                        id="dateFrom"
                                        v-model="from"
                                        size="sm"
                                ></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col">
                            <b-form-group label="Up until date:"
                                          label-class="text-sm-right"
                                          label-for="dateTo"
                                          description="eg. 2018-01-01">
                                <b-form-input
                                        type="date"
                                        id="dateTo"
                                        v-model="to"
                                        size="sm"
                                ></b-form-input>
                            </b-form-group>
                        </div>
                    </template>
                </div>

                <div class="row filter justify-content-center">
                    <b-button variant="link" v-if="!hasAmountFilter" size="sm" @click="showAmountFilter = true">Filter
                        by amount +
                    </b-button>
                    <template v-if="hasAmountFilter">
                        <b-button class="col-12" variant="link" size="sm" @click="clearAmountFilter">Hide amount filter
                            -
                        </b-button>
                        <div class="col-6">
                            <b-form-group label="Min. amount:"
                                          label-class="text-sm-right"
                                          label-for="amountFrom">
                                <b-form-input @keyup.enter.native="onSubmit"
                                              id="amountFrom"
                                              v-model="amountFrom"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-6">
                            <b-form-group label="Max. amount:"
                                          label-class="text-sm-right"
                                          label-for="amountTo">
                                <b-form-input @keyup.enter.native="onSubmit"
                                              id="amountTo"
                                              v-model="amountTo"></b-form-input>
                            </b-form-group>
                        </div>
                    </template>
                </div>

                <div class="row filter justify-content-center">
                    <b-button variant="link" v-if="!hasAccountFilter" @click="showAccountFilter = true" size="sm">Filter
                        by account +
                    </b-button>
                    <template v-if="hasAccountFilter">
                        <b-button class="col-12" variant="link" size="sm" @click="clearAccountFilter">Hide account
                            filter -
                        </b-button>
                        <div class="col">
                            <div class="row">
                                <div class="col">
                                    <b-form-group label="Account holder:"
                                                  label-class="text-sm-right"
                                                  label-for="accountHolder">
                                        <b-form-input @keyup.enter.native="onSubmit" id="accountHolder"
                                                      v-model="accountHolder"></b-form-input>
                                    </b-form-group>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <b-form-group label="Account:"
                                                  label-class="text-sm-right"
                                                  label-for="account">
                                        <b-form-input @keyup.enter.native="onSubmit" id="account"
                                                      v-model="account"></b-form-input>
                                    </b-form-group>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <b-form-group label="Offset account:"
                                                  label-class="text-sm-right"
                                                  label-for="offsetAccount">
                                        <b-form-input @keyup.enter.native="onSubmit" id="offsetAccount"
                                                      v-model="offsetAccount"></b-form-input>
                                    </b-form-group>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>

            </div>

        </b-form>
    </b-card>

</template>

<script>

    import Multiselect from 'vue-multiselect'
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
    import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'
    import _ from 'lodash';

    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'filter-form',
        components: {
            FontAwesomeIcon,
            Multiselect
        },
        computed: {
            ...mapGetters('dashboard', ['searchCriteria']),
            description: {
                get() {
                    return this.searchCriteria.description;
                },
                set(value) {
                    this.updateCriteria({ ...this.searchCriteria, description: value })
                }
            },
            from: {
                get() {
                    return this.searchCriteria.from;
                },
                set(value) {
                    this.updateCriteria({ ...this.searchCriteria, from: value });
                }
            },
            to: {
                get() {
                    return this.searchCriteria.to;
                },
                set(value) {
                    this.updateCriteria({ ...this.searchCriteria, to: value });
                }
            },
            amountFrom: {
                get() {
                    return this.searchCriteria.amountFrom;
                },
                set(value) {
                    this.updateCriteria({ ...this.searchCriteria, amountFrom: value });
                }
            },
            amountTo: {
                get() {
                    return this.searchCriteria.amountTo;
                },
                set(value) {
                    this.updateCriteria({ ...this.searchCriteria, amountTo: value });
                }
            },
            accountHolder: {
                get() {
                    return this.searchCriteria.accountHolder;
                },
                set(value) {
                    this.updateCriteria({ ...this.searchCriteria, accountHolder: value });
                }
            },
            account: {
                get() {
                    return this.searchCriteria.account;
                },
                set(value) {
                    this.updateCriteria({ ...this.searchCriteria, account: value });
                }
            },
            offsetAccount: {
                get() {
                    return this.searchCriteria.offsetAccount;
                },
                set(value) {
                    this.updateCriteria({ ...this.searchCriteria, offsetAccount: value });
                }
            },
            tags: {
                get() {
                    return this.searchCriteria.tags;
                },
                set(value) {
                    this.updateCriteria({ ...this.searchCriteria, tags: value });
                }
            },
            availableTags: {
                get() {
                    return this.$store.getters['dashboard/tags'].map((tag) => ({value: tag.id, name: tag.name}));
                },
                set(value) {}
            },
            hasDescriptionFilter() {
                return this.showDescriptionFilter || this.all(this.description);
            },
            hasAmountFilter() {
                return this.showAmountFilter || _.has(this.searchCriteria, 'amount') && this.atLeastOne(this.amountFrom, this.amountTo);
            },
            hasDateFilter() {
                return this.showDateFilter || this.atLeastOne(this.from, this.to);
            },
            hasAccountFilter() {
                return this.showAccountFilter
                    || this.atLeastOne(this.account, this.accountHolder, this.offsetAccount);
            },
            hasTagFilter() {
                return this.showTagFilter || this.all(this.tags);
            },
            iconFaCheck() {
                return faCheck
            }
        },
        methods: {
            ...mapActions('dashboard', {
                changeFilterCriteria: 'CHANGE_FILTER_CRITERIA'
            }),
            updateCriteria: _.debounce(
                function(criteria) {
                    this.changeFilterCriteria(criteria);
                }, 500
            ),
            clearDescriptionFilter() {
                this.updateCriteria({
                    ...this.searchCriteria,
                    description: null
                });
                this.showDescriptionFilter = false;
            },
            clearAmountFilter() {
                this.updateCriteria({
                    ...this.searchCriteria,
                    amountFrom: null,
                    amountTo: null
                });
                this.showAmountFilter = false;
            },
            clearDateFilter: function () {
                this.updateCriteria({
                    ...this.searchCriteria,
                    from: null,
                    to: null
                });
                this.showDateFilter = false;
            },
            clearAccountFilter() {
                this.updateCriteria({
                    ...this.searchCriteria,
                    account: null,
                    accountHolder: null,
                    offsetAccount: null
                });
                this.showAccountFilter = false;
            },
            all(...fields) {
                return _.every(fields, (field) => !_.isNull(field) && !_.isEmpty(field));
            },
            atLeastOne(...fields) {
                return fields
                    .filter((field) => !_.isNull(field) && !_.isEmpty(field))
                    .length > 0
            },
            btnVariant: function (value) {
                return (value) ? 'primary' : 'outline-primary';
            }
        },
        data: function () {
            return {
                showDescriptionFilter: false,
                showDateFilter: false,
                showAmountFilter: false,
                showAccountFilter: false,
                showTagFilter: false,
                filterValues: {}
            }
        }
    };

</script>

<style lang="scss">
    #app-filter-form-btn-container {
        margin-bottom: 0;
    }

    #app-filter-form-container {
        border: 0;
    }

    #app-filter-form-filters-container .filter:first-child {
        margin-top: 0;
    }

    #app-filter-form-filters-container .filter:last-child {
        border-bottom: 0;
    }

    .filter {
        border-bottom: 1px solid rgba(229, 230, 231, 0.4);
        padding: 0.5rem 0 0.5rem 0;
    }

    #app-filter-form-btn-container {
        button {
            margin: 0 0.5rem 0 0.5rem;

            svg {
                margin-left: 0.2rem;
            }
        }
    }
</style>
