<template>

  <form>

    <b-card id="app-big-filter-form-container" bg-variant="filter-name" class="mb-0">
      <div id="app-big-filter-form-btn-container" class="d-flex justify-content-center">
        <b-button
          :variant="btnVariant(showDescriptionFilter)"
          @click="showDescriptionFilter=!showDescriptionFilter"
          size="sm"
        >filter by description <FontAwesomeIcon v-if="showDescriptionFilter" :icon="iconFaCheck" /></b-button>
        <b-button
          :variant="btnVariant(showDateFilter)"
          @click="showDateFilter=!showDateFilter"
          size="sm"
        >filter by date <FontAwesomeIcon v-if="showDateFilter" :icon="iconFaCheck" /></b-button>
        <b-button
          :variant="btnVariant(showAmountFilter)"
          @click="showAmountFilter=!showAmountFilter"
          size="sm"
        >filter by amount <FontAwesomeIcon v-if="showAmountFilter" :icon="iconFaCheck" /></b-button>
        <b-button
          :variant="btnVariant(showAccountFilter)"
          @click="showAccountFilter=!showAccountFilter"
          size="sm"
        >filter by account <FontAwesomeIcon v-if="showAccountFilter" :icon="iconFaCheck" /></b-button>
        <b-button
          :variant="btnVariant(showTagFilter)"
          @click="showTagFilter=!showTagFilter"
          size="sm"
        >filter by tag <FontAwesomeIcon v-if="showTagFilter" :icon="iconFaCheck" /></b-button>
      </div>

      <div id="app-big-filter-form-filters-container">
        <div v-if="hasDescriptionFilter" class="filter row justify-content-center">
          <div class="col-6">
            <b-form-group label="Description:"
                          label-class="text-sm-right"
                          label-for="dateFrom"
                          description="eg. Dirk van den broek">
              <b-form-input id="dateFrom" v-model="filterValues.description"></b-form-input>
            </b-form-group>
          </div>
        </div>

        <div v-if="hasDateFilter" class="filter row justify-content-center">
          <div class="col-3">
            <b-form-group label="From date:"
                          label-class="text-sm-right"
                          label-for="dateFrom"
                          description="eg. 2017-01-01">
              <b-form-input id="dateFrom" v-model="filterValues.from"></b-form-input>
            </b-form-group>
          </div>
          <div class="col-3">
            <b-form-group label="Up until date:"
                          label-class="text-sm-right"
                          label-for="dateTo"
                          description="eg. 2018-01-01">
              <b-form-input id="dateTo" v-model="filterValues.to"></b-form-input>
            </b-form-group>
          </div>
        </div>

        <div v-if="hasAmountFilter" class="row filter justify-content-center">
          <div class="col-3">
            <b-form-group label="Min. amount:"
                          label-class="text-sm-right"
                          label-for="amountFrom">
              <b-form-input id="amountFrom" v-model="filterValues.amount.from"></b-form-input>
            </b-form-group>
          </div>
          <div class="col-3">
            <b-form-group label="Max. amount:"
                          label-class="text-sm-right"
                          label-for="amountTo">
              <b-form-input id="amountTo" v-model="filterValues.amount.to"></b-form-input>
            </b-form-group>
          </div>
        </div>

        <div v-if="hasAccountFilter" class="row filter">
          <div class="col -6">
            <div class="row">
              <div class="col">
                <b-form-group horizontal
                              label="Account holder:"
                              label-class="text-sm-right"
                              label-for="accountHolder">
                  <b-form-input id="accountHolder" v-model="filterValues.accountHolder"></b-form-input>
                </b-form-group>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <b-form-group horizontal
                              label="Account:"
                              label-class="text-sm-right"
                              label-for="account">
                  <b-form-input id="account" v-model="filterValues.account"></b-form-input>
                </b-form-group>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <b-form-group horizontal
                              label="Offset account:"
                              label-class="text-sm-right"
                              label-for="offsetAccount">
                  <b-form-input id="offsetAccount" v-model="filterValues.offsetAccount"></b-form-input>
                </b-form-group>
              </div>
            </div>
          </div>
        </div>


        <div v-if="hasTagFilter" class="row filter justify-content-center">
          <div class="col-6">
            <b-form-group horizontal
                          label="Search by tag:"
                          label-class="text-sm-right"
                          label-for="tags">
              <multiselect
                v-model="filterValues.tags"
                tag-placeholder="Add this as new tag"
                placeholder="Search or add a tag"
                label="name"
                track-by="value"
                :options="tags"
                :multiple="true"
              ></multiselect>
            </b-form-group>
          </div>
        </div>
      </div>
    </b-card>
  </form>

</template>

<script>

import Multiselect from 'vue-multiselect'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'

export default {
  name: 'big-filter-form',
  components: {
    FontAwesomeIcon,
    Multiselect
  },
  props: [ 'filter', 'possibleTags' ],
  computed: {
    hasDescriptionFilter() {
      return this.showDescriptionFilter || this.all(this.filterValues.description);
    },
    hasAmountFilter() {
      return this.showAmountFilter || this.atLeastOne(this.filterValues.amount.from, this.filterValues.amount.to);
    },
    hasDateFilter() {
      return this.showDateFilter || this.atLeastOne(this.filterValues.from, this.filterValues.to);
    },
    hasAccountFilter() {
      return this.showAccountFilter
        || this.atLeastOne(this.filterValues.account, this.filterValues.accountHolder, this.filterValues.offsetAccount);
    },
    hasTagFilter() {
      return this.showTagFilter || this.all(this.filterValues.tags);
    },
    tags: function() {
      console.log(this);
      return this.possibleTags.map((tag) => ({ value: tag.id, name: tag.name }))
    },
    iconFaCheck() {
      return faCheck
    }
  },
  methods: {
    clearDescriptionFilter() {
      this.filterValues.description = null;
      this.showDescriptionFilter = false;
    },
    clearAmountFilter() {
      this.filterValues.amount.from = null;
      this.filterValues.amount.to = null;
      this.showAmountFilter = false;
    },
    clearDateFilter: function() {
      this.filterValues.from = null;
      this.filterValues.to = null;
      this.showDateFilter = false;
    },
    clearAccountFilter() {
      this.filterValues.account = null;
      this.filterValues.accountHolder = null;
      this.filterValues.offsetAccount = null;
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
  data: function() {
    return {
      showDescriptionFilter: false,
      showDateFilter: false,
      showAmountFilter: false,
      showAccountFilter: false,
      showTagFilter: false,
      filterValues: {
        name: null,
        from: null,
        to: null,
        description: null,
        amount: {
          from: null,
          to: null
        },
        accountHolder: null,
        account: null,
        offsetAccount: null,
        tags: []
      }
    }
  }
};

</script>

<style lang="scss">
  #app-big-filter-form-btn-container {
    margin-bottom: 0;
  }

  #app-big-filter-form-filters-container .filter:first-child {
    border-top: 1px solid rgba(244, 245, 246, 0.8);
    margin-top: 1rem;
  }
  #app-big-filter-form-filters-container .filter:last-child {
    border-bottom: 0;
  }
  .filter {
    border-bottom: 1px solid rgba(244, 245, 246, 0.8);
    padding: 1rem;
  }

  #app-big-filter-form-btn-container {
    button {
      margin: 0 0.5rem 0 0.5rem;

      svg {
        margin-left: 0.2rem;
      }
    }
  }
</style>
