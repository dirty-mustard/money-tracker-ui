<template>
    <b-row class="mb-2">
        <b-col>
            <b-card id="app-quick-filters-container">
                <b-button size="sm" variant="link" disabled>Only show for:</b-button>
                <b-button size="sm" variant="outline-primary" v-on:click="loadThisMonth">This month</b-button>
                <b-button size="sm" variant="outline-primary" v-on:click="loadLastXMonths(1)">Last month</b-button>
                <b-button size="sm" variant="outline-primary" v-on:click="loadLastXMonths(3)">Last 3 months</b-button>
                <b-button size="sm" variant="outline-primary" v-on:click="loadLastXMonths(6)">Last 6 months</b-button>
                <b-button size="sm" variant="outline-primary" v-on:click="loadThisYear">This year</b-button>
                <b-button size="sm" variant="outline-primary" v-on:click="loadLastYear">Last year</b-button>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
    import { mapGetters ,mapActions } from 'vuex';

    export default {
        name: "quick-filters",
        computed: {
            ...mapGetters('dashboard', {
                searchCriteria: 'searchCriteria'
            })
        },
        methods: {
            ...mapActions('dashboard', {
                changeFilterCriteria: 'CHANGE_FILTER_CRITERIA'
            }),
            loadThisMonth() {
                this.changeFilterCriteria({
                    ...this.searchCriteria,
                    ...{
                        from: this.$moment().startOf('month').format('YYYY-MM-DD'),
                        to: this.$moment().endOf('month').format('YYYY-MM-DD')
                    }
                });
            },
            loadLastXMonths(months) {
                this.changeFilterCriteria({
                    ...this.searchCriteria,
                    ...{
                        from: this.$moment().subtract(months, 'months').startOf('month').format('YYYY-MM-DD'),
                        to: this.$moment().endOf('month').format('YYYY-MM-DD')
                    }

                });
            },
            loadThisYear() {
                this.changeFilterCriteria({
                    ...this.searchCriteria,
                    ...{
                        from: this.$moment().startOf('year').format('YYYY-MM-DD'),
                        to: this.$moment().endOf('year').format('YYYY-MM-DD')
                    },
                });
            },
            loadLastYear() {
                this.changeFilterCriteria({
                    ...this.searchCriteria,
                    ... {
                        from: this.$moment().startOf('year').subtract(1, 'year').format('YYYY-MM-DD'),
                        to: this.$moment().startOf('year').subtract(1, 'year').endOf('year').format('YYYY-MM-DD')
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    #app-quick-filters-container {
        border: 0;

        .card-body {
            padding: 0;
            button {
                border: 0;
            }
        }
    }
</style>
