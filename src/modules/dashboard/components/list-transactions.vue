<template>
    <div id="app-list-transactions-container">
        <b-button v-if="currentPage > 1" @click="currentPage--" class="left-pointer" :variant="'link'" :size="'sm'">&lt;</b-button>
        <b-table :items="transactions" :fields="fields" :current-page="currentPage" :per-page="perPage">
            <template slot="accountHolder" slot-scope="row">
                {{ row.item.description }}
                <i class="clearfix" v-if="row.item.tags.length > 0"/>
                <template v-for="(value, key) in row.item.tags">
                    <code class="m-1" :key="key">{{ value.name }}</code>
                </template>
            </template>
            <template slot="more" slot-scope="row">
                <b-btn @click.stop="row.toggleDetails" class="more-button" size="sm" variant="outline-info">
                    {{ row.detailsShowing ? 'Hide' : 'More' }}
                </b-btn>
            </template>
            <template slot="amount" slot-scope="data">
                <p class="lead"
                   v-bind:class="{ expense: data.item.amount < 0, income: data.item.amount > 0 }"
                ><i v-if="data.item.amount > 0">+</i> € {{ data.item.amount }}</p>
            </template>
            <template slot="row-details" slot-scope="row">
                <b-card class="detailed-transaction">
                    <dl>
                        <dt>Description</dt>
                        <dd>{{ row.item.description }}</dd>
                        <dt>Account holder</dt>
                        <dd>{{ row.item.accountHolder }}</dd>
                        <dt>Account</dt>
                        <dd>{{ row.item.account }}</dd>
                    </dl>
                </b-card>
            </template>
        </b-table>
        <b-button v-if="totalRows / perPage > currentPage" @click="currentPage++" class="right-pointer" :variant="'link'" :size="'sm'">&gt;</b-button>
    </div>
</template>

<script>

    import { mapGetters } from 'vuex';

    export default {
        name: 'list-transactions',
        data() {
            return {
                d: null,
                perPage: 5,
                currentPage: 1,
                fields: {
                    date: {
                        tdClass: 'date',
                        label: 'Date',
                        sortable: true
                    },
                    accountHolder: {
                        label: 'Account Holder',
                        sortable: false
                    },
                    more: {
                        tdClass: 'more',
                        label: ' '
                    },
                    amount: {
                        tdClass: 'amount',
                        label: 'Amount',
                        sortable: true
                    }
                }
            }
        },
        computed: {
            ...mapGetters('dashboard', {
                transactions: 'transactions',
            }),
            totalRows: {
                get() {
                    return this.transactions ? this.transactions.length : 0;
                }
            }
        }
    }
</script>

<style lang="scss">
    #app-list-transactions-container {
        .expense {
            color: darkred;
        }
        .income {
            color: darkgreen;
        }
        .table thead th {
            border-bottom: 0;
            border-top: 0;
        }

        .more-button {
            display: none;
        }

        tr:hover .more-button {
            display: inline-block;
            margin: 0;
            /*padding:0;*/
        }

        .table {
            .more {
                min-width: 80px;
            }

            .date {
                font-weight: bolder;
                min-width: 120px;
            }

            .amount {
                min-width: 120px;
                text-align: right;
            }
        }

        .detailed-transaction {
            padding: 1rem;
        }

        .pointer {
            position: absolute;
            top: 20%;
            cursor: pointer;
            height: 60%;
            background-color: rgba(222, 224, 225, 0.2);
            border-color: rgba(222, 224, 225, 0.4);
            color: rgb(160, 160, 160);
            font-weight: bold;
            text-decoration: none;
            padding: 0.1rem;

            &:hover {
                background-color: rgba(222, 224, 225, 0.4);
                border-color: rgba(222, 224, 225, 0.8);
                width: 1.4rem;
            }
        }

        .left-pointer {
            @extend .pointer;
            left: -14px;
            border-radius: 8px 0 0 8px;

            &:hover {
                left: -1.4rem;
            }
        }

        .right-pointer {
            @extend .pointer;
            right: -15px;
            border-radius: 0 8px 8px 0;


            &:hover {
                right: -1.4rem;
            }
        }
    }
</style>
